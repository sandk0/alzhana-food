"use client";

import { NavMenuButton } from "./navmenu-button/navmenu-button";
import { usePathname, useRouter } from "next/navigation";
import CartIcon from "../../assets/images/cart-button.svg";
import ProductsIcon from "../../assets/images/products-button.svg";
import "./navmenu.css";

export function NavMenu() {
  const currentPath = usePathname();

  return (
    <div className="navmenu-wrapper fixed bottom-0 left-0 z-50 w-full h-16">
      <div className="navmenu-button-wrapper grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        <NavMenuButton
          id={"products"}
          active={currentPath === '/'}
          link="/"
          image={ProductsIcon}
          title={"Продукты"}
        />

        <NavMenuButton
          id={"cart"}
          active={currentPath.includes('/cart')}
          link="/cart"
          image={CartIcon}
          title={"Корзина"}
        />
      </div>
    </div>
  );
}
