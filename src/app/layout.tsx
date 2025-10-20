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
          "lịch âm, lịch dương, ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, can chi, trực, chuyển đổi lịch, lịch việt nam, âm lịch, dương lịch, xem lịch, lịch vạn niên, ngày lễ, tết nguyên đán, lịch tháng, lịch năm, nhắc nhở sự kiện, đếm ngược tết, lịch online, lịch miễn phí, xemlich, lich am duong",
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
              type: "image/png",
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
          creator: "@xemlichme",
          site: "@xemlichme",
        },
        icons: {
          icon: [
            { url: "/xemlich_favicon.ico", sizes: "32x32", type: "image/x-icon" },
            { url: "/xemlich_favicon.ico", sizes: "16x16", type: "image/x-icon" },
            { url: "/xemlich_favicon.png", sizes: "48x48", type: "image/png" },
          ],
          apple: [
            { url: "/xemlich_favicon.png", sizes: "180x180", type: "image/png" },
          ],
          shortcut: "/xemlich_favicon.ico",
        },
      };
    }
  } catch (e) { }
  return {
    title: "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
    description:
      "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực. Chuyển đổi dương lịch sang âm lịch dễ dàng.",
    keywords:
      "lịch âm, lịch dương, ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, can chi, trực, chuyển đổi lịch, lịch việt nam, âm lịch, dương lịch, xem lịch, lịch vạn niên, ngày lễ, tết nguyên đán, lịch tháng, lịch năm, nhắc nhở sự kiện, đếm ngược tết, lịch online, lịch miễn phí, xemlich, lich am duong",
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
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo",
      description:
        "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực.",
      images: ["/xemlich_banner.png"],
      creator: "@xemlichme",
      site: "@xemlichme",
    },
    icons: {
      icon: [
        { url: "/xemlich_favicon.ico", sizes: "32x32", type: "image/x-icon" },
        { url: "/xemlich_favicon.ico", sizes: "16x16", type: "image/x-icon" },
        { url: "/xemlich_favicon.png", sizes: "48x48", type: "image/png" },
      ],
      apple: [
        { url: "/xemlich_favicon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/xemlich_favicon.ico",
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
        <link rel="icon" href="/xemlich_favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/xemlich_favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-TileImage" content="/xemlich_favicon.png" />
        <meta name="application-name" content="XemLich.me" />
        <meta name="apple-mobile-web-app-title" content="XemLich.me" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="VN" />
        <meta name="geo.country" content="Vietnam" />
        <meta name="language" content="Vietnamese" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="XemLich.me" />
        <meta name="copyright" content="XemLich.me" />
        <meta name="category" content="Calendar, Vietnamese Calendar, Lunar Calendar" />

        {/* Facebook Meta Tags */}
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xemlich.me" />
        <meta property="og:title" content="Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo" />
        <meta property="og:description" content="Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực. Chuyển đổi dương lịch sang âm lịch dễ dàng." />
        <meta property="og:image" content="https://xemlich.me/xemlich_banner.png" />
        <meta property="og:image:secure_url" content="https://xemlich.me/xemlich_banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Lịch Âm Dương Việt Nam - XemLich.me" />
        <meta property="og:site_name" content="XemLich.me" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="article:publisher" content="https://www.facebook.com/xemlichme" />
        <meta property="article:author" content="https://www.facebook.com/xemlichme" />

        {/* Zalo Meta Tags */}
        <meta property="zalo:title" content="Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo" />
        <meta property="zalo:description" content="Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực. Chuyển đổi dương lịch sang âm lịch dễ dàng." />
        <meta property="zalo:image" content="https://xemlich.me/xemlich_banner.png" />
        <meta property="zalo:url" content="https://xemlich.me" />

        {/* LinkedIn Meta Tags */}
        <meta property="linkedin:title" content="Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo" />
        <meta property="linkedin:description" content="Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực." />
        <meta property="linkedin:image" content="https://xemlich.me/xemlich_banner.png" />

        {/* Telegram Meta Tags */}
        <meta property="telegram:title" content="Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo" />
        <meta property="telegram:description" content="Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực." />
        <meta property="telegram:image" content="https://xemlich.me/xemlich_banner.png" />

        {/* WhatsApp Meta Tags */}
        <meta property="whatsapp:title" content="Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo" />
        <meta property="whatsapp:description" content="Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực." />
        <meta property="whatsapp:image" content="https://xemlich.me/xemlich_banner.png" />

        {/* Pinterest Meta Tags */}
        <meta property="pinterest:title" content="Lịch Âm Dương - Xem Ngày Tốt, Giờ Hoàng Đạo" />
        <meta property="pinterest:description" content="Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực." />
        <meta property="pinterest:image" content="https://xemlich.me/xemlich_banner.png" />

        {/* Twitter Card additional meta */}
        <meta name="twitter:image:alt" content="Lịch Âm Dương Việt Nam - XemLich.me" />
        <meta name="twitter:creator" content="@xemlichme" />
        <meta name="twitter:site" content="@xemlichme" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "XemLich.me - Lịch Âm Dương Việt Nam",
              "alternateName": "Lịch Âm Dương",
              "url": "https://xemlich.me",
              "description": "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo, hắc đạo, tiết khí, trực. Chuyển đổi dương lịch sang âm lịch dễ dàng.",
              "inLanguage": "vi-VN",
              "image": {
                "@type": "ImageObject",
                "url": "https://xemlich.me/xemlich_banner.png",
                "width": 1200,
                "height": 630
              },
              "publisher": {
                "@type": "Organization",
                "name": "XemLich.me",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://xemlich.me/xemlich_logo.png"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://xemlich.me/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

      </head>
      <body
        className={`${inter.variable} font-sans bg-beige text-gray-800 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}