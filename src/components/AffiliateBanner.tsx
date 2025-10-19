"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSettings } from "@/hooks/useSettings";

interface IFuture {
  title: string;
  description: string;
}

export interface IAffiliateBanner {
  provider: string;
  hotTitle: string;
  productImg: string;
  productTitle: string;
  price: number;
  oldPrice: number;
  features: IFuture[];
  linkToBuy: string;
  isVisible?: boolean;
}

export function AffiliateBanner() {
  const [affiliateData, setAffiliateData] = useState<IAffiliateBanner | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { getSetting } = useSettings();

  useEffect(() => {
    fetchAffiliateData();
  }, []);

  const fetchAffiliateData = async () => {
    try {
      const response = await fetch("/api/admin/affiliate");
      const data = await response.json();
      if (data.success && data.data) {
        setAffiliateData(data.data);
        setIsVisible(data.data.isVisible || false);
      }
    } catch (error) {
      console.error("Error fetching affiliate data:", error);
    }
  };

  if (!isVisible || !affiliateData || !affiliateData.productTitle) return null;

  const redirectToBuyLink = () => {
    setIsVisible(false);
    window.open(affiliateData.linkToBuy, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={redirectToBuyLink}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all duration-200"
          aria-label="Đóng">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Shopee Header */}
        <div className="bg-white bg-opacity-95 px-4 py-3 text-center border-b-4 border-orange-600">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-orange-600 font-black text-xl">
              {affiliateData.provider}
            </span>
          </div>
          <div className="inline-block px-4 py-1 bg-red-500 rounded-md">
            <span className="text-white font-bold text-sm">
              🔥 {affiliateData.hotTitle}
            </span>
          </div>
        </div>

        {/* Product Content */}
        <div className="bg-white p-4">
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-28 h-28 bg-white rounded-lg border-2 border-orange-200 overflow-hidden">
              <img
                src={affiliateData.productImg}
                alt={affiliateData.productTitle}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-3">
                {affiliateData.productTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 bg-[#fafafa] p-2">
                <span className="text-orange-600 font-bold text-base sm:text-lg">
                  {affiliateData.price.toLocaleString()}đ
                </span>
                {affiliateData.oldPrice > affiliateData.price && (
                  <>
                    <span className="text-orange-600 text-xs sm:text-sm">-</span>
                    <span className="text-orange-600 font-bold text-base sm:text-lg">
                      {affiliateData.oldPrice.toLocaleString()}đ
                    </span>
                  </>
                )}
              </div>
              {/* {affiliateData.oldPrice > affiliateData.price && (
                <div className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                  -{Math.round(((affiliateData.oldPrice - affiliateData.price) / affiliateData.oldPrice) * 100)}%
                </div>
              )} */}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4 bg-orange-50 p-3 rounded-lg">
            {affiliateData.features.map((f, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="text-orange-600">⚡</span>
                <span className="text-gray-700">
                  {f.title}
                  {f.description ? `: ${f.description}` : ""}
                </span>
              </div>
            ))}
            {/* <div className="flex items-center gap-2 text-sm">
              <span className="text-orange-600">✓</span>
              <span className="text-gray-700 font-semibold">
                Hàng Chính Hãng
              </span>
            </div> */}
          </div>

          {/* Call to Action */}
          <button
            onClick={redirectToBuyLink}
            className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-center">
            🛒 MUA NGAY - FREESHIP 0Đ
          </button>

          <p className="text-center text-xs text-gray-500 mt-2">
            Ủng hộ shop nhé! ❤️
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 left-3 text-2xl animate-bounce">🎁</div>
        <div className="absolute top-20 right-3 text-2xl animate-bounce delay-100">
          ⭐
        </div>
      </div>
    </div>
  );
}

export default AffiliateBanner;
