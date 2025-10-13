import { Header } from "@/components/Header";
import { TodayDisplay } from "@/components/TodayDisplay";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { DayDetailsModal } from "@/components/DayDetailsModal";
import AffiliateBanner from "@/components/AffiliateBanner";
import { IAffiliateBanner } from "../components/AffiliateBanner";

export default function Home() {
  const productData: IAffiliateBanner = {
    provider: "Shopee",
    hotTitle: "FLASH SALE HÔM NAY",
    productImg:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvst4n1mtmu1e1.webp",
    productTitle:
      "Quạt sạc Cầm Tay mini Comet CRF0904 thiết kế hiện đại nhỏ gọn, đẹp mắt",
    price: 149000,
    oldPrice: 299000,
    features: [
      { title: "⚡", description: "Công sạc USB pin Lithium" },
      { title: "🌀", description: "3 cấp độ gió mạnh mẽ" },
      { title: "✓", description: "Hàng Chính Hãng" },
    ],
    linkToBuy:
      "https://shopee.vn/Qu%E1%BA%A1t-s%E1%BA%A1c-mini-Comet-CRF0705-5W-k%E1%BA%B9p-b%C3%A0n-xoay-360-%C4%91%E1%BB%99-pin-1800mAh-i.30072568.3831114907?rModelId=113405269051&sp_atk=f07faf82-2a9f-408f-986c-96f5828f0d86&vItemId=40263872768&vModelId=271146220832&vShopId=1506174776&xptdk=f07faf82-2a9f-408f-986c-96f5828f0d86",
  };

  return (
    <div className="min-h-screen bg-beige">
      <Header />

      <main className="w-full">
        <div className="container mx-auto px-4 py-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Lịch âm hôm nay - 2/3 */}
            <div className="lg:col-span-2">
              <TodayDisplay />
            </div>

            {/* Upcoming Events - 1/3 */}
            <div>
              <UpcomingEvents />
              <AffiliateBanner {...productData} />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <Features />
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <FAQ />
          </div>
        </div>
      </main>

      <DayDetailsModal />
    </div>
  );
}
