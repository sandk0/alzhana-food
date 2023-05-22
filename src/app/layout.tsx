import "./globals.css";
import { Inter } from "next/font/google";
import { AppLayout } from "./AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Кушальня",
  description: "Быстро@Вкусно",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#F9EFE1" }}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
