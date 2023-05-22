import { useState } from "react";
import { useAppContext } from "../../../lib/appctx";
import { ICartProduct } from "../../../lib/models/product";

interface Props {
  product: ICartProduct;
}

export function ProductCounter({ product }: Props) {
  const { cartStore } = useAppContext();
  const [count, setCount] = useState<number>(product.count ?? 1);

  const decreaseCounter = () => {

    const newCount = count - 1;

    const result = cartStore?.decreaseCount(product.id, newCount);

    if (result === true) {
      setCount((prev) => newCount);
    }
  };

  const increaseCounter = () => {
    const newCount = count + 1;

    const increaseRes = cartStore?.increaseCount(product.id, newCount);

    if (increaseRes === true) {
      setCount((prev) => newCount);
    }
  };

  return (
    <div style={{ color: "black" }} className="flex flex-row gap-x-4 items-center">
      <button
        style={{
          fontWeight: 600,
          fontSize: 24,
          paddingBlock: 4,
          paddingInline: 12,
        }}
        onClick={decreaseCounter}
      >
        -
      </button>
      {count}
      <button
        style={{
          fontWeight: 600,
          fontSize: 24,
          paddingBlock: 4,
          paddingInline: 12,
        }}
        onClick={increaseCounter}
      >
        +
      </button>
    </div>
  );
}
