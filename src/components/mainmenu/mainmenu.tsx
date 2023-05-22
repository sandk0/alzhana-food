import { useAppContext } from "../../lib/appctx";
import { MainMenuButton } from "./mainmenu-button/mainmenu-button";
import styles from "./mainmenu.module.css";

export function MainMenu() {
  const { productsStore } = useAppContext();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <MainMenuButton
          title="Заново"
          onClick={() => productsStore?.resetMenu()}
        />
      </ul>
    </nav>
  );
}
