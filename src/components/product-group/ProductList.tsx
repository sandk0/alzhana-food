import dynamic from "next/dynamic";
import { Product } from "./product/Product";
import styles from "./ProductList.module.css";
import { IProduct } from "../../lib/models/product";
import { useAppContext } from "../../lib/appctx";
import { useState } from "react";

const TinderCard = dynamic(() => import("react-tinder-card"), {
  ssr: false,
});

interface Props {
  products: IProduct[];
}

export function ProductList({ products }: Props) {
  const { cartStore } = useAppContext();
  const [lastSwiped, setLastSwiped] = useState<IProduct | null>(null);

  function swipe(direction: string, product: IProduct) {
    console.log("direction is: " + direction);

    if (direction === "left") {
      console.log("skip");
    } else if (direction === "right") {
      console.log("product " + product.title + " added to cart");
      cartStore?.addToCart(product);
      setLastSwiped(product);
    }
  }

  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <TinderCard
          key={product.id}
          onSwipe={(direction) => swipe(direction, product)}
          preventSwipe={["up", "down"]}
          swipeRequirementType="position"
          className="absolute w-11/12"
        >
          <Product
            title={product.title}
            borderColor={product.color}
            description={product.description}
            receipt={product.receipt}
            price={product.price}
            tags={product.tags}
            amount={product.amount}
            image={product.image}
          />
        </TinderCard>
      ))}
    </div>
  );
}
