import { client } from "@/sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartBtn from "@/app/components/addToCartBtn";

// Typescript interface for better development
interface ProductDetail {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  slug: string;
}

async function getProductDetails(slug: string): Promise<ProductDetail | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    category,
    "slug": slug.current
  }`;
  return await client.fetch(query, { slug });
}

export default async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params for Next.js 15 compatibility
  const { slug } = await params;
  const product = await getProductDetails(slug);

  // 2. Error handling if product not found
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Breadcrumbs for SEO and Navigation */}
        <nav className="flex text-sm text-gray-500 mb-8 gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-blue-600 capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Gallery Container */}
          <div className="w-full md:w-1/2 bg-gray-50 rounded-3xl p-6 md:p-12 flex justify-center sticky top-28">
            <div className="relative h-87.5 w-full md:h-125 group">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-tighter">Current Price</p>
                <span className="text-4xl font-black text-blue-600 font-serif">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>
              <div className="ml-auto bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-bold">
                In Stock
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Key Features & Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {product.description || "High-quality tech product designed for maximum performance and durability. Perfect for professional and personal use."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
             <AddToCartBtn product={product} />
              <button className="flex-1 border-2 border-gray-200 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all text-lg active:scale-95">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="text-center p-3">
                <div className="text-blue-600 text-xl mb-1">🚚</div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Fast Delivery</p>
              </div>
              <div className="text-center p-3 border-x border-gray-100">
                <div className="text-blue-600 text-xl mb-1">🛡️</div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">1 Year Warranty</p>
              </div>
              <div className="text-center p-3">
                <div className="text-blue-600 text-xl mb-1">🔄</div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Easy Returns</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}