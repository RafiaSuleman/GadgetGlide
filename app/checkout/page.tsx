"use client";

import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  const orderData = {
    _type: "order",
    fullName: `${formData.get("firstName")} ${formData.get("lastName")}`,
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    items: cart.map((item) => ({
      _key: Math.random().toString(36).substring(2, 9),
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    totalAmount: totalPrice,
    status: "pending",
    orderDate: new Date().toISOString(),
  };

  try {
    const response = await fetch("/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to save order");
    }

    alert("Thank you! Your order has been placed.");

    clearCart();
    router.push("/");
  } catch (error) {
    console.error("Order Error:", error);
    alert("Order is not saved.");
  } finally {
    setLoading(false);
  }
};

  if (!mounted || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-medium text-gray-500">Empty Cart...</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping...
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-serif">Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                required
                className="p-4 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                required
                className="p-4 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-4 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              required
              className="p-4 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              name="address"
              placeholder="Full Address"
              required
              className="p-4 border rounded-xl w-full h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              <p className="text-green-800 font-medium">
                Payment: Cash on Delivery
              </p>
            </div>

            <button
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-black active:scale-95"}`}
            >
              {loading ? "Order Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-8 rounded-3xl h-fit border border-gray-100 sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 border-b pb-6 max-h-100 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.slug}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 bg-white rounded-lg border p-1">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 truncate w-40">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-sm">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-6 text-2xl font-black text-gray-900">
            <span>Total</span>
            <span className="text-blue-700">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
