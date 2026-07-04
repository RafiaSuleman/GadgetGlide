"use client";

import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart,updateQuantity } = useCartStore();

  // Total Price Calculate karna
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <div className="text-6xl">🛒</div>
        <h1 className="text-3xl font-serif font-bold text-gray-800">
          Empty cart
        </h1>
        <p className="text-gray-500">
          It seems you have not found what you are looking for yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition"
        >
         Continue Shopping...
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-serif font-bold mb-10">
        Shopping <span className="text-blue-600">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-24 w-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="grow">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-1">
                  Rs. {item.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.slug, 'minus')} // Single item qty logic manage as per your store
                      className="px-3 py-1 hover:bg-gray-100 text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.slug, 'plus')}
                      className="px-3 py-1 hover:bg-gray-100 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-red-500 text-sm hover:underline ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-gray-400 hover:text-red-500 text-sm font-medium transition"
          >
            Clear Entire Cart
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-gray-50 p-8 rounded-3xl h-fit sticky top-28 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 border-b pb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-bold text-sm">FREE</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-6">
            <span className="text-lg font-bold">Total Amount</span>
            <span className="text-2xl font-black text-blue-600">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>

          <Link href="/checkout">
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-blue-100 active:scale-95 text-center">
              Proceed to Checkout
            </button>
          </Link>

          <p className="text-center text-xs text-gray-400 mt-6">
            Secured and encrypted payment processing.
          </p>
        </div>
      </div>
    </div>
  );
}
