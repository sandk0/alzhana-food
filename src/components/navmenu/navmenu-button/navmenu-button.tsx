import Image from "next/image";
import styles from "./navmenu-button.module.css";
import { useRouter } from "next/navigation";

interface Props {
  active: boolean;
  id: string;
  link: string;
  title: string;
  image: string;
}

export function NavMenuButton({ id, title, link, image, active }: Props) {
  const router = useRouter();
  let className = [styles.button];

  if (active) {
    className.push(styles.active);
  }

  function handleClick() {
    router.push(link);
  }

  return (
    <button className={className.join(" ")} onClick={handleClick}>
      <Image src={image} alt={title} />
    </button>
  );
}
