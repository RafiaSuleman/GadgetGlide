"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setForm({
          name: data.name || "",
          price: String(data.price || ""),
          category: data.category || "",
          description: data.description || "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    if (id) loadProduct();
  }, [id]);

  const updateProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Product Updated Successfully");

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <div className="space-y-6">

        <input
          className="border w-full p-3 rounded-lg"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          className="border w-full p-3 rounded-lg"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          className="border w-full p-3 rounded-lg"
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <textarea
          rows={6}
          className="border w-full p-3 rounded-lg"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button
          onClick={updateProduct}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}