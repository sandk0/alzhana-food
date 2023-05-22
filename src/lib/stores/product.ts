import { Dispatch, SetStateAction, useState } from "react";
import { IProduct } from "../models/product";

const mockProducts: IProduct[] = [
  {
    id: "1",
    title: "Борщ",
    color: "red",
    description: "Он вкусный и жидкий",
    amount: 23,
    price: "120",
    receipt: "Вода, бурак, еще что-то там",
    tags: ["борщ", "суп"],
    image:
      "https://static.sobaka.ru/images/image/01/47/91/87/_normal.jpg?v=1632735844",
  },
  {
    id: "2",
    title: "Гороховый суп",
    description: "Он вкусный и жидкий",
    color: "red",
    amount: 5,
    price: "110",
    receipt: "Вода, горох, зелень, еще что-то там",
    tags: ["гороховый", "суп"],
    image:
      "https://resizer.mail.ru/p/f7f2e696-19d9-5770-9d50-343d06c80237/AAAcrGmd6EYYX_VnqZdI8ltnxZFrSNNvY7YsoP32wVwwi-SkeTZ6z0VIw5VVXg9lASdJLcQP6j3M-sCstSxmH85QP-w.jpg",
  },
  {
    id: "3",
    title: "Куриный бульон",
    description: "Он вкусный и жидкий",
    color: "red",
    amount: 13,
    price: "80",
    receipt: "Вода, вода, кость, зелень, еще что-то там",
    tags: ["бульон", "куриный", "суп"],

    image:
      "https://static.vkusnyblog.ru/full/uploads/2008/09/kurinyi-sup-s-lapshoi-new.jpg",
  },
  {
    id: "144",
    title: "Пюре с котлетой",
    description: "Просто безумие",
    color: "yellow",
    amount: 15,
    price: "140",
    receipt: "Картошка, котлета куриная",
    tags: ["борщ", "суп"],
    image:
      "https://www.photorecept.ru/wp-content/uploads/2021/04/kotlety-s-pjure-941x1300.jpg",
  },
  {
    id: "255",
    title: "Гречневая каша",
    description: "Все просто",
    color: "yellow",
    amount: 10,
    price: "40",
    receipt: "Гречка, зелень",
    tags: ["гороховый", "суп"],
    image:
      "https://gotovim.uz/wp-content/uploads/2022/04/grechnevaja-kasha-s-gribami-i-shpinatom-861x1300-1.jpg",
  },
];

export interface ProductsStore {
  menu: IProduct[];
  setMenu: (products: IProduct[]) => void;
  resetMenu: () => void;
}

export const useProductsStore = (): ProductsStore => {
  const [menu, setMenu] = useState<IProduct[]>([]);

  const resetMenu = () => {
    setMenu([...mockProducts]);
  };

  const setMenuProducts = (products: IProduct[]) => {
    if (products.length !== 0) {
      setMenu(products);
    } else {
      setMenu(mockProducts);
    }
  };

  return { menu, setMenu: setMenuProducts, resetMenu };
};
