import { client } from "@/sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartBtn from "@/app/components/addToCartBtn";

interface ProductDetail {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  slug: string;
}

async function getProductDetails(
  slug: string
): Promise<ProductDetail | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    category,
    "slug": slug.current
  }`;

  return client.fetch(query, { slug });
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetails(slug);

  if (!product) {
    notFound();
  }

  const category = product.category || "Technology";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:mb-8 sm:text-sm"
        >
          <Link
            href="/"
            className="shrink-0 transition-colors hover:text-blue-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="shrink-0 capitalize transition-colors hover:text-blue-600"
          >
            {category}
          </Link>

          <span>/</span>

          <span className="min-w-0 truncate font-medium text-gray-900">
            {product.name}
          </span>
        </nav>

        {/* Product Layout */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-10 lg:gap-16">

          {/* Product Image */}
          <div className="relative w-full min-w-0 rounded-2xl bg-[#f7f8fc] p-4 sm:rounded-3xl sm:p-6 md:sticky md:top-24 md:w-1/2 md:p-8 lg:p-10">
            <div className="relative h-65 w-full sm:h-87.5 md:h-100 lg:h-115">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain transition-transform duration-300 md:hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  Product image unavailable
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full min-w-0 space-y-6 md:w-1/2 md:space-y-7">

            {/* Category and Title */}
            <div>
              <span className="mb-3 inline-block max-w-full truncate rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-700 sm:text-xs">
                {category}
              </span>

              <h1 className="wrap-break-word text-2xl font-black leading-tight tracking-tight text-gray-950 sm:text-3xl lg:text-5xl">
                {product.name}
              </h1>
            </div>

            {/* Price and Availability */}
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-6 sm:pb-8">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm">
                  Current Price
                </p>

                <p className="mt-2 wrap-break-word text-2xl font-black text-blue-600 sm:text-3xl lg:text-4xl">
                  Rs. {Number(product.price).toLocaleString("en-PK")}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-bold text-green-700 sm:px-3 sm:text-sm">
                In Stock
              </span>
            </div>

            {/* Product Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Product Description
              </h2>

              <p className="break-word text-sm leading-7 text-gray-600 sm:text-base">
                {product.description ||
                  "High-quality tech product designed for performance and durability. Perfect for professional and personal use."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 items-stretch gap-3 border-b border-gray-100 pb-6 pt-2 sm:gap-4 sm:pb-8">

              {/* Add to Cart */}
              <div
                className="
                  flex min-h-12 min-w-0 items-stretch
                  [&_button]:m-0!
                  [&_button]:flex!
                  [&_button]:h-12!
                  [&_button]:min-h-12!
                  [&_button]:w-full!
                  [&_button]:items-center!
                  [&_button]:justify-center!
                  [&_button]:rounded-xl!
                  [&_button]:px-2!
                  [&_button]:py-3!
                  [&_button]:text-xs!
                  [&_button]:font-bold!
                  sm:[&_button]:text-sm!
                "
              >
                <AddToCartBtn product={product} />
              </div>

              {/* Buy Now */}
              <button
                type="button"
                className="
                  flex h-12 min-h-12 w-full min-w-0
                  items-center justify-center rounded-xl
                  border border-gray-200 bg-white
                  px-2 py-3 text-xs font-bold text-gray-900
                  transition-all duration-200
                  hover:border-blue-600 hover:bg-blue-600 hover:text-white
                  active:scale-[0.98]
                  sm:text-sm
                "
              >
                Buy Now
              </button>

            </div>

            {/* Shopping Benefits */}
            <div className="grid grid-cols-3 gap-2 pt-1 sm:gap-4">

              <div className="rounded-xl bg-gray-50 px-2 py-4 text-center sm:px-3">
                <div className="mb-2 text-xl">🚚</div>

                <p className="text-[9px] font-bold uppercase leading-4 text-gray-500 sm:text-[10px]">
                  Fast Delivery
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 px-2 py-4 text-center sm:px-3">
                <div className="mb-2 text-xl">🛡️</div>

                <p className="text-[9px] font-bold uppercase leading-4 text-gray-500 sm:text-[10px]">
                  1 Year Warranty
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 px-2 py-4 text-center sm:px-3">
                <div className="mb-2 text-xl">🔄</div>

                <p className="text-[9px] font-bold uppercase leading-4 text-gray-500 sm:text-[10px]">
                  Easy Returns
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}