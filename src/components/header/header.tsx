import { Account } from "./account/account";
import { Cart } from "./cart/cart";

export function Header() {
  return (
    <>
      <Account />
      <Cart />
    </>
  );
}
