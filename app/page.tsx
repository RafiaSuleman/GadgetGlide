import Link from "next/link";
import Hero from "./components/hero";
import FeatureProducts from "./components/featureProducts";

export default async function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-[#111827]">
      <Hero />
    <FeatureProducts />
      {/* Trust and shopping benefits */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-6 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: "✦",
              title: "Premium Technology",
              subtitle: "Quality products for everyday life",
            },
            {
              icon: "✓",
              title: "Trusted Shopping",
              subtitle: "A simple and convenient experience",
            },
            {
              icon: "↗",
              title: "Explore Latest Gear",
              subtitle: "Find your next favourite device",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}

      {/* Shopping call to action */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-[#101827] px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
              Your next upgrade starts here
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Find the tech that fits your life.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Explore our collection and discover your next favourite gadget
              with Gadget Glide.
            </p>

            <Link
              href="#featured-products"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
            >
              Explore Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
