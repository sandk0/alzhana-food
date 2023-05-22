import { useAppContext } from "@/lib/appctx";
import { fetchMenu } from "../page";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { IProduct } from "@/lib/models/product";


export const metadata = {
    title: "Панель управления",
    description: "Быстро@Вкусно",
  };

export default async function Page() {
  const menu = await fetchMenu();
  const allProducts = await fetchAllProducts();

  return (
    <div className="p-10 md:px-20">
      <h1 className="mb-4" style={{fontSize: '1.8rem', fontWeight: 800}}>Управление меню</h1>
      <Dashboard initialMenu={menu} allProducts={allProducts} />
    </div>
  );
}

async function fetchAllProducts() {
    try {
        const req = await fetch(
          "http://45.142.213.132:8000/all_product/?format=json",
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
