"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string; // unique item id based on product and subscription option
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  option: string;
  quantity: number;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
      originalPrice: number;
    },
    option: string
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("nirogi_cart");
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (e) {
          console.error("Failed to parse stored cart data", e);
        }
      }
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nirogi_cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
      originalPrice: number;
    },
    option: string
  ) => {
    const optionSlug = option.replace(/\s+/g, "-").toLowerCase();
    const itemUniqueId = `${product.id}-${optionSlug}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemUniqueId);
      if (existingItem) {
        toast.success(`Incremented quantity for ${product.name} (${option})`);
        return prevCart.map((item) =>
          item.id === itemUniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`Added ${product.name} (${option}) to cart`);
        return [
          ...prevCart,
          {
            id: itemUniqueId,
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            originalPrice: product.originalPrice,
            option: option,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === id);
      if (item) {
        toast.info(`Removed ${item.name} (${item.option}) from cart`);
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
