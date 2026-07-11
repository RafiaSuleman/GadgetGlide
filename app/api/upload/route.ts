import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const asset = await client.assets.upload(
      "image",
      buffer,
      {
        filename: file.name,
      }
    );

    return NextResponse.json({
      success: true,
      assetId: asset._id,
      url: asset.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Image upload failed",
      },
      {
        status: 500,
      }
    );
  }
}