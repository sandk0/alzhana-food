"use client";
import { useAppContext } from "@/lib/appctx";
import { IProduct } from "@/lib/models/product";
import { useEffect } from "react";
import Image from "next/image";

interface Props {
  initialMenu: IProduct[];
  allProducts: IProduct[];
}

export function Dashboard({ initialMenu, allProducts }: Props) {
  const { productsStore } = useAppContext();

  console.log("Dashboard menu prop: " + JSON.stringify(initialMenu));

  useEffect(() => {
    if (productsStore) {
      productsStore.setMenu(initialMenu);
    }
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col md:flex-row gap-4 justify-evenly">
      <div className="w-5/12 h-100 p-4" style={{ border: "1px solid gray" }}>
        <div className="w-full">
          {initialMenu.map((pr) => {
            return (
              <div key={pr.id} className="flex flex-row gap-x-4">
                <div style={{ width: 100, height: 100, position: "relative" }}>
                  <Image
                    src={pr.image}
                    alt={pr.title}
                    fill
                    style={{ position: "absolute", objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                    {pr.title}
                  </div>
                  <div className="flex flex-row gap-x-6">
                    <div>
                      <p>Цена</p>
                      <input type="text" style={{ width: "100%", borderRadius: 26 }} />
                    </div>
                    <div>
                      <p>Грамм</p>
                      <input type="text" style={{ width: "100%", borderRadius: 26 }} />
                    </div>
                    <div>
                      <p>Кол-во порций</p>
                      <input type="text" style={{ width: "100%", borderRadius: 26 }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-7/12  h-100 p-4" style={{ border: "1px solid gray" }}>
        <div className="w-full flex flex-row flex-wrap gap-2">
          {initialMenu.map((pr) => {
            return (
              <div
                key={pr.id}
                style={{ width: 180, height: 180 }}
                className="flex flex-row gap-x-4 relative overflow-hidden"
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  className="rounded-md"
                >
                  <Image
                    src={pr.image}
                    alt={pr.title}
                    fill
                    className="rounded-md"
                    style={{ position: "absolute", objectFit: "cover" }}
                  />
                </div>
                <div
                  className="absolute top-2 left-2 right-2 py-2 px-4 text-center rounded-md"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    color: "#fff",
                  }}
                >
                  {pr.title}
                </div>
                <button
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-md"
                  style={{ background: "green", color: "#fff" }}
                >
                  Добавить
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
