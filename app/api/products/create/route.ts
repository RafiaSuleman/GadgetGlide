import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await client.create({
      _type: "product",
      name: body.name,
      price: Number(body.price),
      category: body.category,
      slug: {
        _type: "slug",
        current: body.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: body.assetId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}