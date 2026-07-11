import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export const dynamic = "force-dynamic";

// GET Products
export async function GET() {
  try {
    const products = await client.fetch(
      `
      *[_type=="product"] | order(_createdAt desc){
        _id,
        name,
        price,
        category,
        description,
        "imageUrl": image.asset->url,
        "slug": slug.current
      }
      `
    );

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

// POST Product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, price, category, imageAssetId } = body;

    const product = await client.create({
      _type: "product",
      name,
      price: Number(price),
      category,

     slug: {
  _type: "slug",
  current: name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""),
},

      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAssetId,
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
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}