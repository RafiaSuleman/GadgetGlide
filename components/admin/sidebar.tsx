"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

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

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 w-full text-left mt-8"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </aside>
  );
}