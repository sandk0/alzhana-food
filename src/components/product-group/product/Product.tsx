import Image from "next/image";
import styles from "./Product.module.css";

interface Props {
  title: string;
  borderColor: string;
  description: string;
  receipt: string;
  price: string;
  tags: string[];
  amount: number;
  image: string;
}

export function Product({
  title,
  borderColor,
  description,
  receipt,
  price,
  tags,
  amount,
  image,
}: Props) {
  return (
    <div
      className={styles.wrapper}
      style={{ borderColor: borderColor, borderWidth: 6, borderRadius: 26 }}
    >
      <div className={styles.price}>
        <p style={{ color: borderColor }}>{price} ₽</p>
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div
        style={{ borderRadius: 26 }}
        className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <Image
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
