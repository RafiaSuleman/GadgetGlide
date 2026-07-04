"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Item {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  items: Item[];
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  // Load Orders
  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/order", {
          cache: "no-store",
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }

    loadOrders();
  }, []);

  // Update Order Status
  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status,
        }),
      });

      if (!res.ok) {
        alert("Status update failed.");
        return;
      }

      // Update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const value = search.toLowerCase();

    return (
      order.fullName.toLowerCase().includes(value) ||
      order.email.toLowerCase().includes(value) ||
      order.status.toLowerCase().includes(value)
    );
  });
  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.replace("/admin/login");
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>

        <div className="flex gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by name, email or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6"
      />

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">Loading Orders...</div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{order.fullName}</h2>

                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                  <p>{order.address}</p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
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
              </div>

              <div className="mt-4 border-t pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <span>
                      {item.productName} × {item.quantity}
                    </span>

                    <span>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xl font-bold">
                Total: Rs. {order.totalAmount.toLocaleString()}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => updateStatus(order._id, "pending")}
                  className="px-4 py-2 bg-yellow-200 rounded-lg hover:bg-yellow-300"
                >
                  Pending
                </button>

                <button
                  onClick={() => updateStatus(order._id, "shipped")}
                  className="px-4 py-2 bg-blue-200 rounded-lg hover:bg-blue-300"
                >
                  Shipped
                </button>

                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  className="px-4 py-2 bg-green-200 rounded-lg hover:bg-green-300"
                >
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
