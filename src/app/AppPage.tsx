"use client";

import { useEffect } from "react";
import { useAppContext } from "../lib/appctx";
import { IProduct } from "../lib/models/product";
import { MainMenu } from "../components/mainmenu/mainmenu";
import { ProductList } from "../components/product-group/ProductList";

interface Props {
  menu: IProduct[];
}

export function AppPage({ menu }: Props) {
  const { isLoggedIn, cartStore, productsStore } = useAppContext();

  console.log('App Page menu prop: ' + JSON.stringify(menu))

  useEffect(() => {
    if (productsStore) {
      productsStore.setMenu(menu);
    }
  }, []);

  return (
    <>
      {/* <MainMenu /> */}
      {/* <div className="fixed bottom-10">
        <p>User is {isLoggedIn ? "logged in" : "unknown"}</p>
        <h3>Cart:</h3>
        {cartStore?.products.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div> */}

      <div className="w-full lg:w-8/12">
        {productsStore?.menu.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-screen"><p style={{ color: "black" }}>Загрузка...</p></div>
        ) : (
          <ProductList products={productsStore!.menu} />
        )}
      </div>
      <div className="w-full lg:w-4/12">{/* <CartButton /> */}</div>
    </>
  );
}
