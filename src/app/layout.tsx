import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/settings`,
      { next: { revalidate: 60 } }
    );
    const result = await res.json();
    if (result.success && Array.isArray(result.data)) {
      const settingsObj = result.data.reduce(
        (acc: Record<string, string>, item: any) => {
          acc[item.key] = item.value;
          return acc;
        },
        {}
      );
      return {
        title:
          settingsObj.site_title ||
          "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
        description:
          settingsObj.site_description ||
          "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực. Chuyển đổi dương lịch sang âm lịch dễ dàng.",
        keywords:
          settingsObj.seo_keywords ||
          "lịch âm, lịch dương, ngày tốt, giờ hoàng đạo, tiết khí, can chi, trực, chuyển đổi lịch",
        authors: [{ name: settingsObj.contact_email || "Calendar Next" }],
        robots: "index, follow",
        openGraph: {
          title:
            settingsObj.site_title ||
            "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
          description:
            settingsObj.site_description ||
            "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực.",
          type: "website",
          locale: "vi_VN",
        },
      };
    }
  } catch (e) { }
  return {
    title: "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
    description:
      "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực. Chuyển đổi dương lịch sang âm lịch dễ dàng.",
    keywords:
      "lịch âm, lịch dương, ngày tốt, giờ hoàng đạo, tiết khí, can chi, trực, chuyển đổi lịch",
    authors: [{ name: "Calendar Next" }],
    robots: "index, follow",
    openGraph: {
      title: "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
      description:
        "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực.",
      type: "website",
      locale: "vi_VN",
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="icon" href="/icon.png" />

      </head>
      <body
        className={`${inter.variable} font-sans bg-beige text-gray-800 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
