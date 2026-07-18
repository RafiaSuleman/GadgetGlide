"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <FaTachometerAlt />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <FaBoxOpen />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <FaShoppingCart />,
  },
  {
    title: "Add Product",
    href: "/admin/products/add",
    icon: <FaPlusCircle />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.replace("/admin/login");
  };


  return (
  <>
    {/* Mobile Header */}
    <div className="lg:hidden flex items-center justify-between bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <button onClick={() => setOpen(!open)}>
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>

    {/* Overlay */}
    {open && (
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setOpen(false)}
      />
    )}

    {/* Sidebar */}
    <aside
      className={`
      fixed lg:static
      top-0 left-0
      z-50
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-6
      transform
      transition-transform
      duration-300
      ${
        open
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }
    `}
    >
      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="space-y-3">

        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${
              pathname === item.href
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 w-full text-left mt-8"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
    </aside>
  </>
);
}