"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const AUTO_HIDE_MS = 12000;
const MIN_VISIBLE_MS = 280;

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  const visibleRef = useRef(false);
  const startedAtRef = useRef(0);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setVisible = useCallback((next: boolean) => {
    visibleRef.current = next;
    setIsVisible(next);
  }, []);

  const clearTimers = useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const beginNavigation = useCallback(() => {
    clearTimers();
    if (!visibleRef.current) {
      startedAtRef.current = Date.now();
      setVisible(true);
    }
    autoHideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, AUTO_HIDE_MS);
  }, [clearTimers, setVisible]);

  const finishNavigation = useCallback(() => {
    if (!visibleRef.current) return;
    const elapsed = Date.now() - startedAtRef.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
    clearTimers();
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, delay);
  }, [clearTimers, setVisible]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      if (!target) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const interactiveChild = target.closest(
        "button, input, select, textarea, [role='button']",
      );
      if (interactiveChild && interactiveChild !== anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      if (
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search
      ) {
        return;
      }

      beginNavigation();
    };

    const handlePopState = () => {
      beginNavigation();
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      beginNavigation();
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      beginNavigation();
      return originalReplaceState.apply(this, args);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimers();
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [beginNavigation, clearTimers]);

  useEffect(() => {
    finishNavigation();
  }, [pathname, searchParams, finishNavigation]);

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200 ${
        isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-slate-900/12 backdrop-blur-[2px]" />
      <span className="relative h-9 w-9 animate-spin rounded-full border-[3px] border-white/70 border-t-orange-500 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.8)]" />
    </div>
  );
}
