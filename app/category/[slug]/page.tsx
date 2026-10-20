import AddToCartBtn from "@/app/components/addToCartBtn";
import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  category: string;
}

async function getCategoryProducts(categoryName: string) {
  const query = `*[_type == "product" && category match $categoryName]{
    name,
    price,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    category
  }`;
  return await client.fetch(query, { categoryName });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getCategoryProducts(slug);

  if (!products || products.length === 0) {
    return (
      <div className="p-20 text-center min-h-[60vh] flex flex-col justify-center">
        <h1 className="text-2xl italic text-gray-400">
          `{slug} `no product found
        </h1>
        <p className="mt-2 text-blue-500"> check category in Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif font-semibold mb-10 capitalize pb-4 ">
        {slug} <span className="text-blue-700">Collection</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          /* Fixed height card for uniform look */
          <div
            key={product.slug}
            className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-120"
          >
            {/* Image Container with fixed height */}
            <div className="relative h-56 w-full bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Section with flex-grow to push buttons down */}
            <div className="flex flex-col grow mt-6">
              <div className="grow">
                <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {product.category}
                </span>
                {/* line-clamp-2 ensures title doesn't break layout */}
                <Link href={`/product/${product.slug}`}>
                  <h3 className="line-clamp-2 min-h-10 text-sm  leading-none text-gray-900 transition-colors group-hover:text-blue-600 sm:text-base">
                    {product.name}
                  </h3>
                </Link>
              </div>

              {/* Price and Button section */}
              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex flex-col gap-1 mb-4">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="font-serif text-xl font-black text-gray-900">
                    ${product.price}
                  </span>
                </div>
                <div className="mt-3">
                  <AddToCartBtn product={product} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
