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

  // Load Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }

        setProducts(data);
      } catch (error) {
        console.error("Fetch Products Error:", error);
      }
    };

    loadProducts();
  }, []);

  // Delete Product
  const deleteProduct = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed");
        return;
      }

      alert("Product deleted successfully");

      // Remove product from UI
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const filteredProducts = products.filter((product) => {
    const value = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)
    );
  });

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>

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
        <p className="text-center text-gray-500">No Products Found</p>
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

              <h2 className="text-xl font-bold mt-4">{product.name}</h2>

              <p className="text-gray-500">{product.category}</p>

              <p className="font-bold text-lg mt-2">
                Rs. {product.price.toLocaleString()}
              </p>

              <div className="flex gap-3 mt-5">
                <Link
                  href={`/admin/products/edit/${product._id}`}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
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
