"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Laptops");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Upload Image
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        alert(uploadData.error);
        return;
      }

      // Create Product
      const createRes = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          category,
          assetId: uploadData.assetId,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        alert(createData.error);
        return;
      }

      alert("Product Added Successfully!");

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 font-semibold">Product Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="HP Laptop"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Price</label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="120000"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Laptops</option>
            <option>Mobiles</option>
            <option>Accessories</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
