import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import jwt from "jsonwebtoken";

function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Total Products
    const products = await client.fetch(`
      count(*[_type=="product"])
    `);

    // All Orders
    const orders = await client.fetch(`
      *[_type=="order"] | order(orderDate asc)
    `);

    const totalOrders = orders.length;
    const today = new Date().toISOString().split("T")[0];

    const todaysOrders = orders.filter((order: { orderDate: string }) =>
      order.orderDate.startsWith(today),
    ).length;
    const todaysRevenue = orders
      .filter(
        (order: {
          orderDate: string;
          status: string;
          totalAmount?: number | string;
        }) => order.orderDate.startsWith(today) && order.status === "delivered",
      )
      .reduce(
    (total: number, order: { totalAmount?: number | string }) =>
      total + Number(order.totalAmount || 0),
    0
  );

    const shippedOrders = orders.filter(
      (order: { status: string }) => order.status === "shipped",
    ).length;

    const deliveredOrders = orders.filter(
      (order: { status: string }) => order.status === "delivered",
    ).length;

    const pendingOrders = orders.filter(
      (order: { status: string }) => order.status === "pending",
    ).length;

    // Revenue (Delivered Orders Only)
    const revenue = orders
      .filter((order: { status: string }) => order.status === "delivered")
      .reduce(
        (total: number, order: { totalAmount?: string | number }) =>
          total + Number(order.totalAmount || 0),
        0,
      );

    // Pie Chart Data
    const orderStatus = [
      {
        name: "Pending",
        value: pendingOrders,
      },
      {
        name: "Shipped",
        value: shippedOrders,
      },
      {
        name: "Delivered",
        value: deliveredOrders,
      },
    ];

    // Monthly Revenue
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = months.map((month) => ({
      month,
      revenue: 0,
    }));

    orders
      .filter((order: { status: string }) => order.status === "delivered")
      .forEach(
        (order: { orderDate: string; totalAmount?: number | string }) => {
          const date = new Date(order.orderDate);

          const monthIndex = date.getMonth();

          monthlyRevenue[monthIndex].revenue += Number(order.totalAmount || 0);
        },
      );

    // Recent Orders (Last 5)
    const recentOrders = [...orders]
      .reverse()
      .slice(0, 5)
      .map(
        (order: { fullName: string; totalAmount: number; status: string }) => ({
          fullName: order.fullName,
          totalAmount: order.totalAmount,
          status: order.status,
        }),
      );
      // Latest Customers
const latestCustomers = [...orders]
  .reverse()
  .slice(0, 5)
  .map(
    (order: {
      fullName: string;
      email: string;
    }) => ({
      fullName: order.fullName,
      email: order.email,
    })
  );
    // Top Selling Products
    const productSales: Record<string, number> = {};

    orders.forEach(
      (order: { items: { productName: string; quantity: number }[] }) => {
        order.items.forEach((item) => {
          if (!productSales[item.productName]) {
            productSales[item.productName] = 0;
          }

          productSales[item.productName] += item.quantity;
        });
      },
    );

    const topProducts = Object.entries(productSales)
      .map(([name, sold]) => ({
        name,
        sold,
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
   return NextResponse.json({
  products,
  totalOrders,
  pendingOrders,
  shippedOrders,
  deliveredOrders,
  revenue,

  todaysOrders,
  todaysRevenue,

  orderStatus,
  monthlyRevenue,

  recentOrders,
  topProducts,

  latestCustomers,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard stats",
      },
      {
        status: 500,
      },
    );
  }
}
