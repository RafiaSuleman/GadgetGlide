import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    // Total Products
    const products = await client.fetch(
      `count(*[_type == "product"])`
    );

    // All Orders
    const orders = await client.fetch(
      `*[_type == "order"]`
    );

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order: { status?: string }) => order.status === "pending"
    ).length;

    const shippedOrders = orders.filter(
      (order: { status?: string }) => order.status === "shipped"
    ).length;

    const deliveredOrders = orders.filter(
      (order: { status?: string }) => order.status === "delivered"
    ).length;

    // Revenue (Only Delivered Orders)
    const revenue = orders
      .filter(
        (order: { status?: string }) => order.status === "delivered"
      )
      .reduce(
        (
          total: number,
          order: { total?: number }
        ) => total + (order.total || 0),
        0
      );

    return NextResponse.json({
      products,
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      revenue,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard stats",
      },
      {
        status: 500,
      }
    );
  }
}