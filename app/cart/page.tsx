"use client";

import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } =
    useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString("en-PK")}`;

  // Empty Cart
  if (cart.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f7f8fc] px-4 py-10">
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-gray-100 bg-white px-5 py-10 text-center shadow-sm sm:px-8 sm:py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            🛒
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-900 sm:text-3xl">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
            You have not added any products yet. Discover your favourite
            gadgets and start shopping.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
          >
            Continue Shopping <span className="ml-2">→</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* Page Heading */}
        <div className="mb-6 sm:mb-9">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 sm:text-xs">
            Your shopping bag
          </p>

          <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Shopping <span className="text-blue-600">Cart.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {cart.reduce((total, item) => total + item.quantity, 0)}{" "}
            {cart.reduce((total, item) => total + item.quantity, 0) === 1
              ? "item"
              : "items"}{" "}
            in your cart
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">

          {/* Cart Items */}
          <section
            aria-label="Cart items"
            className="min-w-0 space-y-3 sm:space-y-4 lg:col-span-2"
          >
            {cart.map((item) => (
              <article
                key={item.slug}
                className="flex min-w-0 gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:rounded-3xl sm:p-5"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${item.slug}`}
                  aria-label={`View ${item.name}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f7f8fc] sm:h-32 sm:w-32 sm:rounded-2xl"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 639px) 96px, 128px"
                      className="object-contain p-2 sm:p-3"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-xs text-gray-400">
                      No image
                    </span>
                  )}
                </Link>

                {/* Product Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <Link href={`/product/${item.slug}`}>
                      <h2 className="line-clamp-2 break-word text-sm font-bold leading-5 text-gray-900 transition-colors hover:text-blue-600 sm:text-base sm:leading-6">
                        {item.name}
                      </h2>
                    </Link>

                    <p className="mt-2 text-sm font-black text-blue-600 sm:text-base">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-4">
                    <div
                      className="inline-flex h-9 shrink-0 items-center overflow-hidden rounded-lg border border-gray-200 bg-white"
                      aria-label={`Quantity: ${item.quantity}`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.slug, "minus")
                        }
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="flex h-full w-8 items-center justify-center text-lg font-medium text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                      >
                        −
                      </button>

                      <span className="flex h-full min-w-8 items-center justify-center px-1 text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.slug, "plus")
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex h-full w-8 items-center justify-center text-lg font-medium text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.slug)}
                      className="rounded-md px-1 py-1 text-xs font-semibold text-red-500 transition hover:text-red-700 sm:text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={clearCart}
                className="rounded-lg px-2 py-2 text-xs font-semibold text-gray-500 transition hover:text-red-600 sm:text-sm"
              >
                Clear entire cart
              </button>
            </div>
          </section>

          {/* Order Summary */}
          <aside className="h-fit min-w-0 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:sticky lg:top-24 lg:p-8">
            <h2 className="text-xl font-black text-gray-950 sm:text-2xl">
              Order Summary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review your order before checkout.
            </p>

            {/* Price Breakdown */}
            <div className="mt-6 space-y-4 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between gap-3 py-5">
              <span className="text-sm font-bold text-gray-900 sm:text-base">
                Total Amount
              </span>

              <span className="break-word text-right text-xl font-black text-blue-600 sm:text-2xl">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Checkout */}
            <Link
              href="/checkout"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98] sm:py-4 sm:text-base"
            >
              Proceed to Checkout <span>→</span>
            </Link>

            {/* Continue Shopping */}
            <Link
              href="/"
              className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Continue Shopping
            </Link>

            {/* Trust note */}
            <div className="mt-5 flex items-start justify-center gap-2 text-center">
              <span className="text-sm">🔒</span>
              <p className="text-[11px] leading-5 text-gray-400">
                Your order details are handled securely.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}