"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCalendarDay } from "react-icons/fa";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaMoneyBillWave,
  FaClock,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "@/components/admin/sidebar";
interface Stats {
  products: number;
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  revenue: number;
  todaysOrders: number;
  orderStatus: {
    name: string;
    value: number;
  }[];
  latestCustomers: {
    fullName: string;
    email: string;
  }[];
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];

  recentOrders: {
    fullName: string;
    totalAmount: number;
    status: string;
  }[];
  topProducts: {
    name: string;
    sold: number;
  }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    totalOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    revenue: 0,
    todaysOrders: 0,
    latestCustomers: [],
    orderStatus: [],
    monthlyRevenue: [],
    recentOrders: [],
    topProducts: [],
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats", {
          cache: "no-store",
        });

        const data = await res.json();
        console.log("Dashboard Data:", data);
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);
  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];
  const cards = [
    {
      title: "Products",
      value: stats.products,
      color: "bg-blue-500",
      icon: <FaBoxOpen size={28} />,
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      color: "bg-purple-500",
      icon: <FaShoppingCart size={28} />,
    },
    {
      title: "Today's Orders",
      value: stats.todaysOrders,
      color: "bg-pink-500",
      icon: <FaCalendarDay size={28} />,
    },
    {
      title: "Revenue",
      value: `Rs. ${stats.revenue.toLocaleString()}`,
      color: "bg-green-500",
      icon: <FaMoneyBillWave size={28} />,
    },
    {
      title: "Pending",
      value: stats.pendingOrders,
      color: "bg-yellow-500",
      icon: <FaClock size={28} />,
    },
    {
      title: "Shipped",
      value: stats.shippedOrders,
      color: "bg-indigo-500",
      icon: <FaTruck size={28} />,
    },
    {
      title: "Delivered",
      value: stats.deliveredOrders,
      color: "bg-emerald-600",
      icon: <FaCheckCircle size={28} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
      <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>

          <p className="text-gray-500 mt-2">Welcome back 👋</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-2xl p-6 shadow-lg`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg opacity-90">{card.title}</p>

                <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
              </div>

              {card.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Monthly Revenue</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Order Status</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={stats.orderStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {stats.orderStatus.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Top Selling Products</h2>

        <div className="space-y-4">
          {stats.topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">#{index + 1}</span>

                <span className="font-semibold">{product.name}</span>
              </div>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {product.sold} Sold
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Customer</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-medium">{order.fullName}</td>

                  <td className="py-4">
                    Rs. {order.totalAmount.toLocaleString()}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }
                  ${
                    order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : ""
                  }
                  ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : ""
                  }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Latest Customers</h2>

        <div className="space-y-4">
          {stats.latestCustomers.map((customer, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-semibold">{customer.fullName}</p>

                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}
