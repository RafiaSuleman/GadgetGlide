"use client";

import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";
import dynamic from "next/dynamic";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-black tracking-tighter text-blue-700 hover:opacity-80 transition">
        TECH<span className="text-gray-900">PULSE</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <Link href="/category/laptops" className="hover:text-blue-700 transition">Laptops</Link>
        <Link href="/category/mobiles" className="hover:text-blue-700 transition">Cell Phone</Link>
        <Link href="/category/accessories" className="hover:text-blue-700 transition">Accessories</Link> 
      </div>

      {/* Cart Icon Section */}
      <div className="flex items-center gap-5">
        <Link href="/cart" className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          {/* Badge: Ab yahan koi logic nahi, sirf value dikhayenge */}
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

// Exporting with SSR disabled to fix Hydration & useEffect issues
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });