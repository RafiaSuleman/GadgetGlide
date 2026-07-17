import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import jwt from "jsonwebtoken";

function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  console.log("TOKEN:", token);

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("JWT VERIFIED:", decoded);
    return true;
  } catch (error) {
    console.log("JWT ERROR:", error);
    return false;
  }
}

// ================= GET ORDERS =================

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const orders = await client.fetch(`
      *[_type=="order"] | order(orderDate desc)
    `);

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch orders",
      },
      {
        status: 500,
      }
    );
  }
}

// ================= UPDATE STATUS =================

export async function PATCH(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { orderId, status } = await req.json();

    await client.patch(orderId).set({ status }).commit();

    return NextResponse.json({
      success: true,
      message: "Order Updated",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update order",
      },
      {
        status: 500,
      }
    );
  }
}