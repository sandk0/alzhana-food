"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartStore, storageCartKey, useCartStore } from "./stores/cart";
import { storageRefreshToken } from "./stores/user";
import { ProductsStore, useProductsStore } from "./stores/product";

interface User {
  phone: string;
  name: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  user: User | null;
  cartStore: CartStore | null;
  productsStore: ProductsStore | null;
}

const defaultAppState: AppContextType = {
  isLoggedIn: false,
  user: null,
  productsStore: null,
  cartStore: null,
};

export const AppContext = createContext<AppContextType>(defaultAppState);

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  return ctx;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cartStore = useCartStore();
  const productsStore = useProductsStore();

  useEffect(() => {
    initUser();
    cartStore.init();
  }, []);

  function initUser() {
    const token = localStorage.getItem(storageRefreshToken);
    if (token) {
      setIsLoggedIn(true);
      // todo: fetch user and setUser
    }
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: null,
        cartStore: cartStore,
        productsStore: productsStore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
