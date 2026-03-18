"use client";

import { useRef, useState } from "react";

const VIDEO_START_TIME = 2;

const safePlay = async (video: HTMLVideoElement) => {
  try {
    await video.play();
  } catch {
    // Autoplay may be blocked in some browsers; keep the banner rendered.
  }
};

const getStartTime = (duration: number) =>
  Number.isFinite(duration) && duration > VIDEO_START_TIME
    ? VIDEO_START_TIME
    : 0;

export default function VendorBannerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  const seekToStart = (video: HTMLVideoElement) => {
    const startTime = getStartTime(video.duration);

    if (startTime === 0) {
      setIsReady(true);
      void safePlay(video);
      return;
    }

    setIsReady(false);
    video.currentTime = startTime;
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    seekToStart(video);
  };

  const handleSeeked = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setIsReady(true);
    void safePlay(video);
  };

  const handleEnded = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    seekToStart(video);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-label="Become a Vendor banner video"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          onEnded={handleEnded}
        >
          <source src="/vendor-become-banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(196,181,253,0.26),transparent_28%),linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(2,6,23,0.76)_34%,rgba(2,6,23,0.34)_62%,rgba(2,6,23,0.58)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-89px)] max-w-7xl items-end px-6 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24">
        <div className="max-w-3xl text-white">
          <p className="text-sm font-medium uppercase tracking-[0.34em] text-white/70 sm:text-base">
            SellersLogin
          </p>
          <h1 className="mt-5 text-5xl font-light tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl lg:leading-[0.92]">
            Become a Vendor
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Start selling with a storefront, catalog, orders, payments, and one
            vendor dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
