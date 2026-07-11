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

//  GET SINGLE PRODUCT 
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const product = await client.fetch(
      `*[_type=="product" && _id==$id][0]{
        _id,
        name,
        price,
        category,
        description,
        "imageUrl": image.asset->url
      }`,
      { id }
    );

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// UPDATE PRODUCT
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const body = await req.json();

    const updatedProduct = await client
      .patch(id)
      .set({
        name: body.name,
        price: Number(body.price),
        category: body.category,
        description: body.description,
      })
      .commit();

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Update Failed" },
      { status: 500 }
    );
  }
}

//DELETE PRODUCT
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    await client.delete(id);

    return NextResponse.json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Delete Failed" },
      { status: 500 }
    );
  }
}