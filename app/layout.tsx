import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "多数人的历史｜普通人的历史博物馆",
  description: "为每一个普通人保存一生的故事。历史从我们这里开始记录。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "多数人的历史",
    description: "历史从我们这里开始记录。",
    images: ["https://history-of-ordinary-people.verasimedazi0.chatgpt.site/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "多数人的历史",
    description: "历史从我们这里开始记录。",
    images: ["https://history-of-ordinary-people.verasimedazi0.chatgpt.site/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
