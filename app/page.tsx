import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import Hero from "./components/hero";
import AddToCartBtn from "./components/addToCartBtn";

interface Product {
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  category: string;
}

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    name,
    price,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    category
  }`;

  return client.fetch(query);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-[#111827]">
      <Hero />

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
                <p className="mt-1 text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
           {/* Featured Products */}
      <section
        id="featured-products"
        className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8"
      >
        {/* Section Heading */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 sm:text-xs">
              Handpicked for you
            </p>

            <h2 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Featured Products<span className="text-blue-600">.</span>
            </h2>

            <p className="mt-2 max-w-md text-xs leading-5 text-gray-500 sm:text-sm">
              Discover your next favourite gadget.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700 sm:text-xs">
            {Math.min(products.length, 6)} Products
          </span>
        </div>

        {/* Compact Product Grid: 2 mobile, 3 desktop */}
        {products.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
            {products.slice(0, 7).map((product) => (
              <article
                key={product.slug}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="block"
                >
                  <div className="relative m-2 h-36 overflow-hidden rounded-xl bg-[#f5f7fb] sm:m-3 sm:h-48">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 360px"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-5"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        Image unavailable
                      </div>
                    )}

                    {/* Category Badge */}
                    <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-full border border-white/80 bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-700 shadow-sm backdrop-blur sm:left-3 sm:top-3 sm:text-[10px]">
                      {product.category || "Technology"}
                    </span>
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex flex-1 flex-col px-3 py-2 pt-1 sm:px-4 sm:pb-4">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="line-clamp-2 min-h-10 text-sm  leading-none text-gray-900 transition-colors group-hover:text-blue-600 sm:text-base">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-[10px] font-medium text-gray-500 sm:text-xs">
                      Price
                    </p>

                    <p className="mt-1 text-base font-black tracking-tight text-gray-950 sm:text-xl">
                      Rs. {Number(product.price).toLocaleString("en-PK")}
                    </p>
                  </div>

                  {/* Existing Add to Cart Functionality */}
                  <div className="mt-3">
                    <AddToCartBtn product={product} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
            <h3 className="text-lg font-bold text-gray-900">
              Products coming soon
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Please check back soon for our latest gadgets.
            </p>
          </div>
        )}
      </section>
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
              Explore our collection and discover your next favourite
              gadget with Gadget Glide.
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