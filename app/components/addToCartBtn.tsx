"use client";
import { useCartStore } from "@/app/store/cartStore";

interface Product {
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function AddToCartBtn({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="flex-2 bg-blue-600 text-white py-2 rounded-2xl px-5 items-center justify-center hover:bg-black transition-all shadow-lg text-lg"
    >
      Add to Cart
    </button>
  );
}