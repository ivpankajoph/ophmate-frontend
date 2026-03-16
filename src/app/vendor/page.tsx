import Image from "next/image";
import Link from "next/link";

const mainSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "/";
const supportEmail = "support@sellerslogin.com";
const adminLoginUrl =
  process.env.NEXT_PUBLIC_ADMIN_APP_URL ?? "http://localhost:5173/sign-in?redirect=%2F";
const newTabProps = {
  target: "_blank",
  rel: "noreferrer",
};

export default function VendorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Link href={mainSiteUrl} className="flex min-w-0 items-center gap-3" {...newTabProps}>
            <Image
              src="/sellerslogin-logo.svg"
              alt="SellersLogin logo"
              width={48}
              height={48}
              priority
              className="h-12 w-12 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight text-slate-950">SellersLogin</p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Build for your all e-commerce needs
              </p>
            </div>
          </Link>

       
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:min-h-[calc(100vh-89px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700 underline">
            Became a Vendor today for freee !
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[0.92]">
            Start selling for free forever .
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This page is now only for account access. Create a new seller account for
            free, or log in if you already have one.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/vendor/registration"
              className="inline-flex min-h-14 items-center justify-center border border-violet-700 bg-violet-700 px-8 text-base font-semibold text-white transition hover:bg-violet-800"
              {...newTabProps}
            >
              Sign up for free
            </Link>
            <a
              href={adminLoginUrl}
              className="inline-flex min-h-14 items-center justify-center border border-slate-300 px-8 text-base font-semibold text-slate-900 transition hover:bg-slate-950 hover:text-white"
              {...newTabProps}
            >
              Login if you already have an account
            </a>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Login opens the admin app and then continues to the dashboard after sign-in.
          </p>
        </section>

        <section className="border border-slate-200 bg-slate-50 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Quick Flow
          </p>

          <div className="mt-8 space-y-8">
            <div className="border-b border-slate-200 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Step 1
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Sign up for free
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Fill in the registration form and create your seller account.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Step 2
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Login to dashboard
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Existing users can go directly into the admin system and manage their
                store from the dashboard.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Support
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Need help? Contact{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="font-semibold text-slate-950 underline-offset-4 hover:underline"
                  {...newTabProps}
                >
                  {supportEmail}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 border border-slate-200 bg-white p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/sellerslogin-logo.svg"
                  alt="SellersLogin logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0"
                />
                <div>
                  <p className="text-2xl font-bold tracking-tight text-slate-950">SellersLogin</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Build for your all e-commerce needs
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
                Simple vendor access for sellers who want a clean signup path and a
                direct route into the admin dashboard.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Quick Links
              </p>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                <Link href={mainSiteUrl} className="block hover:text-violet-700" {...newTabProps}>
                  Main Site
                </Link>
                <Link
                  href="/vendor/registration"
                  className="block hover:text-violet-700"
                  {...newTabProps}
                >
                  Sign up for free
                </Link>
                <a href={adminLoginUrl} className="block hover:text-violet-700" {...newTabProps}>
                  Login to dashboard
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Contact
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <a
                  href={`mailto:${supportEmail}`}
                  className="block font-semibold text-slate-950 hover:text-violet-700"
                  {...newTabProps}
                >
                  {supportEmail}
                </a>
                <p>Office No 834, Gaur City Mall, Greater Noida</p>
                <p>Uttar Pradesh 201312, India</p>
              </div>
            </div>
          </div>

          <div className="border-x border-b border-slate-200 bg-white px-8 py-4 text-sm text-slate-500">
            Copyright {new Date().getFullYear()} SellersLogin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
