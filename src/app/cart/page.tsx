"use client";
import Image from "next/image";
import { useAppContext } from "../../lib/appctx";
import { ProductCounter } from "../../components/product-group/product/ProductCounter";
import { useEffect, useState } from "react";
import styles from "./CartPage.module.css";

export default function Page() {
  const { cartStore } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const totalPrice = cartStore?.products.reduce(
      (total, { price, count }) =>
        Number.parseFloat(total.toString()) + Number.parseFloat(price) * count,
      0
    );

    setTotalPrice(totalPrice ?? 0);
  }, [cartStore?.products]);

  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  async function handleOrderConfirm() {
    setIsLoading(true);
    const result = await cartStore?.confirmOrder({ address, phone });

    setIsLoading(false);

    if (result === false) {
      console.log("error");
      return;
    }

    cartStore?.clear();
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-y-2">
        <p className="text-xl"  style={{ color: "black" }}>Заказ успешно оформлен!</p>
        <p className="text-gray-400 text-sm">
          Отследить его статус можно в профиле
        </p>
      </div>
    );
  }

  if (cartStore?.products.length === 0) {
    return (
      <div style={{ color: "black" }} className="flex justify-center items-center min-h-screen">
        Корзина пуста
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 items-center">
      {cartStore?.products.map((product) => (
        <div
          key={product.id}
          className="flex flex-row gap-x-2 justify-between w-11/12 m-2 p-3"
          style={{ borderRadius: 26, border: `1px solid ${product.color}` }}
        >
          <div className="flex flex-row gap-x-2 ">
            <div
              style={{ height: "100px", width: "100px" }}
              className="relative"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{
                  objectFit: "cover",
                  position: "absolute",
                  borderRadius: 26,
                }}
              />
            </div>
            <h3 style={{ fontSize: 18, color: "black" }}>{product.title}</h3>
          </div>
          <div className="flex flex-col gap-y-4 items-center">
            <p style={{ color: "black" }}>{product.price} ₽</p>
            <ProductCounter product={product} />
          </div>
        </div>
      ))}
      <div className="mt-10">
        <p
          style={{
            fontSize: 18,
            color: "black"
          }}
        >
          Оформление заказа
        </p>
      </div>
      {/* <div className="flex flex-row justify-between items-center w-11/12 mx-2">
        <button disabled className={[styles.orange_button, "w-5/12"].join(" ")}>
          Доставка
        </button>
        <button disabled className={[styles.orange_button, "w-5/12 "].join(" ")}>
          Самовывоз
        </button>
      </div> */}
      <div className="mt-4 w-11/12 flex flex-col gap-y-2">
        <input
          className={styles.form_input}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Адрес"
          disabled={isLoading}
        />
        <input
          className={styles.form_input}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Номер телефона"
          disabled={isLoading}
        />
      </div>
      <button
        className={[
          styles.orange_button,
          "flex flex-row justify-between items-center w-11/12 mt-6 mb-32",
        ].join(" ")}
        onClick={handleOrderConfirm}
        disabled={isLoading}
      >
        <div>Оформить заказ</div>
        <div>{totalPrice} ₽</div>
      </button>
    </div>
  );
}
