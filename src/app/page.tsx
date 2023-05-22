import { IProduct } from "../lib/models/product";
import { AppPage } from "./AppPage";

export default async function Home() {
  const menu = await fetchMenu();

  return (
    <main className="flex flex-col lg:flex-row overflow-hidden">
      <AppPage menu={menu} />
    </main>
  );
}

export async function fetchMenu() {
  try {
    const req = await fetch(
      "http://45.142.213.132:8000/get_menu/?format=json",
      {
        mode: "no-cors",
        cache: "no-store"
      }
    );
    const data = await req.json();

    return data as IProduct[];
  } catch (e) {
    return [];
  }
}
