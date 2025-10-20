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
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://xemlich.me",
          siteName: "XemLich.me",
          images: [
            {
              url: "/xemlich_banner.png",
              width: 1200,
              height: 630,
              alt: "Lịch Âm Dương Việt Nam - XemLich.me",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title:
            settingsObj.site_title ||
            "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
          description:
            settingsObj.site_description ||
            "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực.",
          images: ["/xemlich_banner.png"],
        },
        icons: {
          icon: [
            { url: "/xemlich_favicon.png", sizes: "32x32", type: "image/png" },
            { url: "/xemlich_favicon.png", sizes: "16x16", type: "image/png" },
          ],
          apple: [
            { url: "/xemlich_favicon.png", sizes: "180x180", type: "image/png" },
          ],
          shortcut: "/xemlich_favicon.png",
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
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://xemlich.me",
      siteName: "XemLich.me",
      images: [
        {
          url: "/xemlich_banner.png",
          width: 1200,
          height: 630,
          alt: "Lịch Âm Dương Việt Nam - XemLich.me",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
      description:
        "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực.",
      images: ["/xemlich_banner.png"],
    },
    icons: {
      icon: [
        { url: "/xemlich_favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/xemlich_favicon.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/xemlich_favicon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/xemlich_favicon.png",
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="icon" href="/xemlich_favicon.png" />
        <link rel="apple-touch-icon" href="/xemlich_favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-TileImage" content="/xemlich_favicon.png" />
        <meta name="application-name" content="XemLich.me" />
        <meta name="apple-mobile-web-app-title" content="XemLich.me" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      </head>
      <body
        className={`${inter.variable} font-sans bg-beige text-gray-800 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
