"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const value = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)
    );
  });

  return (
    <div className="p-10">
       <h1 className="text-5xl text-red-600">
      CATCH ALL PAGE
    </h1>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Products Management
        </h1>

        <div className="flex gap-3">
          <Link
            href="/admin"
            className="px-5 py-2 bg-black text-white rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Orders
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by product name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 w-full mb-8"
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No Products Found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <h2 className="text-xl font-bold mt-4">
                {product.name}
              </h2>

              <p className="text-gray-500">
                {product.category}
              </p>

              <p className="font-bold text-lg mt-2">
                Rs. {product.price.toLocaleString()}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}