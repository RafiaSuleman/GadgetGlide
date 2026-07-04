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

// Data fetch karne ka function
async function getProducts() {
  const query = `*[_type == "product"]{
    name,
    price,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    category
  }`;
  const data = await client.fetch(query);
  return data as Product[];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />

      {/* Product Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 border-b-2 border-blue-500 inline-block pb-2">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <div
              key={product.slug}
              className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* Product Image Container */}
              <div className="relative h-64 w-full bg-gray-50 rounded-t-xl overflow-hidden group">
                <Link href={`/product/${product.slug}`}>
                  <div className="relative h-64 w-full bg-gray-50 rounded-t-xl overflow-hidden cursor-pointer">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Details Section */}
              <div className="p-5 flex flex-col grow">
                <div className="grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.category || "Tech"}
                  </span>
                  <h3 className="text-lg font-bold mt-3 text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                </div>

                {/* Price and Button on Separate Lines */}
                <div className="mt-6 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">
                      Price
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      Rs. {product.price}
                    </span>
                  </div>

                  {/* <div className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors duration-200 shadow-md"> */}
                   <AddToCartBtn product={product}/>
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
