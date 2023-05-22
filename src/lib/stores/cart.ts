import { Dispatch, SetStateAction, useState } from "react";
import { ICartProduct, IProduct } from "../models/product";
import { init } from "next/dist/compiled/@vercel/og/satori";

export const storageCartKey = "user.cart";

export interface CartStore {
  products: ICartProduct[];
  init: () => void;
  clear: () => void;
  setProducts: (products: ICartProduct[]) => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseCount: (productId: string, newCount: number) => boolean;
  decreaseCount: (productId: string, newCount: number) => boolean;
  confirmOrder: ({
    address,
    phone,
  }: {
    address: string;
    phone: string;
  }) => Promise<boolean>;
}

export const useCartStore = (): CartStore => {
  const [products, setProducts] = useState<ICartProduct[]>([]);

  function init() {
    const rawCart = localStorage.getItem(storageCartKey);
    if (rawCart) {
      const cart = JSON.parse(rawCart);
      setProducts(cart);
    }
  }

  function clear() {
    setCartProducts([]);
  }

  function setCartProducts(products: ICartProduct[]) {
    setProducts(products);
    const newCartString = JSON.stringify(products);
    localStorage.setItem(storageCartKey, newCartString);
  }

  function addToCart(product: IProduct) {
    const isFinded = products.find((pr) => pr.id === product.id);

    if (isFinded) {
      increaseCount(product.id, isFinded.count + 1);
      return;
    }

    const cartProduct: ICartProduct = { ...product, count: 1 };
    setProducts((prev) => [...products, cartProduct]);

    const newCartString = JSON.stringify(products);
    localStorage.setItem(storageCartKey, newCartString);
  }

  function removeFromCart(productId: string) {
    let prevCart = products;

    let newCart = prevCart.filter((product) => product.id === productId);

    setProducts((prev) => newCart);

    const newCartString = JSON.stringify(newCart);
    localStorage.setItem(storageCartKey, newCartString);
  }

  function decreaseCount(productId: string, newCount: number) {
    try {
      let newCart = products;
      if (newCount === 0) {
        newCart = newCart.filter((pr) => pr.id !== productId);
      } else {
        newCart = [
          ...newCart.map((pr) => {
            if (pr.id === productId) {
              return { ...pr, count: newCount };
            }
            return pr;
          }),
        ];
      }

      setProducts(newCart);

      const newCartString = JSON.stringify(newCart);
      localStorage.setItem(storageCartKey, newCartString);

      return true;
    } catch (e) {
      return false;
    }
  }

  function increaseCount(productId: string, newCount: number) {
    try {
      const newCart = [
        ...products.map((pr) => {
          if (pr.id === productId) {
            return { ...pr, count: newCount };
          }
          return pr;
        }),
      ];

      setProducts(newCart);

      const newCartString = JSON.stringify(newCart);
      localStorage.setItem(storageCartKey, newCartString);

      return true;
    } catch (e) {
      return false;
    }
  }

  async function confirmOrder({
    address,
    phone,
  }: {
    address: string;
    phone: string;
  }) {
    try {
      let form = {
        user_id: "1",
        address: address,
        phone: phone,
        products: products.map((pr) => {
          return { id: pr.id, amount: pr.count };
        }),
      };

      const req = await fetch("/cart/api", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const res = await req.json();
      console.log('cart.ts ' + JSON.stringify(res))

      return Promise.resolve(res.result);
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  return {
    products,
    init,
    clear,
    setProducts: setCartProducts,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    confirmOrder,
  } as CartStore;
};
