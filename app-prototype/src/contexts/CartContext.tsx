"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ServiceDetail } from "@/lib/constants/categories";

export type CartItem = ServiceDetail & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (service: ServiceDetail) => void;
  removeFromCart: (serviceName: string) => void;
  updateQuantity: (serviceName: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (serviceName: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (service: ServiceDetail) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === service.name);
      if (existing) {
        return prev.map((item) =>
          item.name === service.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceName: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === serviceName);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.name === serviceName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return prev.filter((item) => item.name !== serviceName);
    });
  };

  const updateQuantity = (serviceName: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.name !== serviceName));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.name === serviceName ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (serviceName: string) => {
    const item = cart.find((item) => item.name === serviceName);
    return item?.quantity || 0;
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
