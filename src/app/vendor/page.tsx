import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  PackagePlus,
  ReceiptIndianRupee,
  Truck,
  UserRoundPlus,
} from "lucide-react";
import VendorBannerVideo from "@/components/vendor/VendorBannerVideo";

const sellerFeatureItems = [
  {
    title: "Create",
    description:
      "Register in minutes with your GST details, business address, and payout account from one guided onboarding flow.",
    Icon: UserRoundPlus,
  },
  {
    title: "List",
    description:
      "Add products, pricing, and category data through a clean catalog workspace built for real teams and large assortments.",
    Icon: PackagePlus,
  },
  {
    title: "Orders",
    description:
      "Receive storefront orders in one operational view, with queue visibility for packing, approvals, and dispatch.",
    Icon: ClipboardList,
  },
  {
    title: "Shipment",
    description:
      "Move shipments forward with tracking checkpoints, delivery coordination, and courier visibility that stays readable.",
    Icon: Truck,
  },
  {
    title: "Payments",
    description:
      "Monitor settlements, payout status, and reconciliation without bouncing between payment dashboards and reports.",
    Icon: ReceiptIndianRupee,
  },
] as const;

const sellerFlowItems = [
  {
    step: "Step 1",
    title: "Create your seller account",
    description:
      "Start the registration flow with your business, GST, and payout details.",
  },
  {
    step: "Step 2",
    title: "Login to the dashboard",
    description:
      "Access the admin workspace to manage products, orders, and store operations.",
  },
] as const;

const supportEmail = "support@sellerslogin.com";
const adminLoginUrl =
  process.env.NEXT_PUBLIC_ADMIN_APP_URL ??
  "http://localhost:5173/sign-in?redirect=%2F";

export default function VendorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/sellerslogin-logo.svg"
              alt="SellersLogin logo"
              width={48}
              height={48}
              priority
              className="h-12 w-12 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                SellersLogin
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Build your Dreams
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={adminLoginUrl}
              className="inline-flex h-11 items-center justify-center border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:border-violet-200 hover:text-violet-700"
              target="_blank"
              rel="noreferrer"
            >
              Login
            </a>
            <Link
              href="/vendor/registration"
              className="inline-flex h-11 items-center justify-center bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Create Store For Free
            </Link>
          </div>
        </div>
      </header>

      <VendorBannerVideo />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <section>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                Seller onboarding
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[0.94]">
                Open your seller account and start operating in one place.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Create your seller profile, access the admin workspace, and keep
                catalog, orders, shipments, and payouts under one system.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/vendor/registration"
                  className="inline-flex min-h-14 items-center justify-center bg-violet-700 px-8 text-base font-semibold text-white transition hover:bg-violet-800"
                >
                  Sign up for free
                </Link>
                <a
                  href={adminLoginUrl}
                  className="inline-flex min-h-14 items-center justify-center border border-slate-300 px-8 text-base font-semibold text-slate-900 transition hover:bg-slate-950 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Login to dashboard
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Login opens the admin app and continues to the seller dashboard
                after sign-in.
              </p>
            </section>

            <aside className="border border-slate-200 bg-slate-50 p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Quick flow
              </p>

              <div className="mt-8 space-y-8">
                {sellerFlowItems.map(({ step, title, description }) => (
                  <div
                    key={step}
                    className="border-b border-slate-200 pb-8 last:border-b-0 last:pb-0"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                      {step}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                      {title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {description}
                    </p>
                  </div>
                ))}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                    Support
                  </p>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Need help? Contact{" "}
                    <a
                      href={`mailto:${supportEmail}`}
                      className="font-semibold text-slate-950 underline-offset-4 hover:underline"
                    >
                      {supportEmail} 
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Product preview
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                See how the seller workspace looks in motion.
              </h2>
            </div>

            <div className="mt-10 relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                <source
                  src="/ff0f7f96-c725-431b-aaa5-4923307a8b8b.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
                Seller operations
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Everything your seller team needs from signup to payouts.
              </h2>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-5">
              {sellerFeatureItems.map(({ title, description, Icon }) => (
                <article key={title}>
                  <div className="flex min-h-[220px] items-center justify-center border border-slate-200 bg-white/70 p-2">
                    <div className="flex h-20 w-20 items-center justify-center border border-violet-200 bg-violet-50 text-violet-700">
                      <Icon className="h-10 w-10" strokeWidth={1.6} />
                    </div>
                  </div>
                  <h3 className="mt-8 text-4xl font-bold tracking-[-0.05em] text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-9 text-slate-600">
                    {description}
                  </p>
                </article>
              ))}
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
                  <p className="text-2xl font-bold tracking-tight text-slate-950">
                    SellersLogin
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Build your Dreams
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
                Simple vendor access for sellers who want a clean signup path
                and a direct route into the admin dashboard.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Quick links
              </p>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                <Link
                  href="/vendor/registration"
                  className="block hover:text-violet-700"
                >
                  Sign up for free
                </Link>
                <a
                  href={adminLoginUrl}
                  className="block hover:text-violet-700"
                  target="_blank"
                  rel="noreferrer"
                >
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
                >
                  {supportEmail}
                </a>
                <p>Blogs</p>
              </div>
            </div>
          </div>

          <div className="border-x border-b border-slate-200 bg-white px-8 py-4 text-sm text-slate-500">
            Copyright {new Date().getFullYear()} SellersLogin. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
