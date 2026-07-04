import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json();

    const result = await client.create({
      _type: "order",
      ...orderData,
    });

    return NextResponse.json({
      success: true,
      orderId: result._id,
    });
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 }
    );
  }
}