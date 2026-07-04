import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
export const dynamic = "force-dynamic";
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
`,
  {},
  {
    cache: "no-store",
  }
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