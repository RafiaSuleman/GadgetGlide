import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import jwt from "jsonwebtoken";

function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

// GET ORDERS

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

// UPDATE STATUS

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