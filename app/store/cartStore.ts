import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, type: 'plus' | 'minus') => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      
      addToCart: (newItem) => set((state) => {
        const existingItem = state.cart.find((item) => item.slug === newItem.slug);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.slug === newItem.slug ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
      }),

      removeFromCart: (slug) => set((state) => ({
        cart: state.cart.filter((item) => item.slug !== slug),
      })),

      updateQuantity: (slug, type) =>
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.slug === slug) {
                const newQty =
                  type === "plus" ? item.quantity + 1 : item.quantity - 1;

                return { ...item, quantity: newQty };
              }
              return item;
            })
            .filter((item) => item.quantity > 0), // ✅ remove only when 0
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'techpulse-cart', // Browser storage key
    }
  )
);