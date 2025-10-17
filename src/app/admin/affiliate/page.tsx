"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IAffiliateBanner } from "@/components/AffiliateBanner";

function AdminAffiliatePageComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [affiliateData, setAffiliateData] = useState<IAffiliateBanner>({
    provider: "SHOPEE",
    hotTitle: "FLASH SALE 12.12",
    productImg: "",
    productTitle: "",
    price: 0,
    oldPrice: 0,
    features: [],
    linkToBuy: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newFeature, setNewFeature] = useState({ title: "", description: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any)?.role !== "admin") {
      router.push("/admin/login");
      return;
    }

    fetchAffiliateData();
  }, [session, status, router]);

  const fetchAffiliateData = async () => {
    try {
      const response = await fetch("/api/admin/affiliate");
      const data = await response.json();
      if (data.success && data.data) {
        const loadedData = {
          ...data.data,
          features: data.data.features || []
        };
        setAffiliateData(loadedData);
        setIsVisible(data.data.isVisible || false);
      }
    } catch (error) {
      console.error("Error fetching affiliate data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const dataToSave = { ...affiliateData, isVisible };
      
      const response = await fetch("/api/admin/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        setModalMessage("Đã lưu cấu hình affiliate banner thành công!");
        setShowSuccessModal(true);
      } else {
        setModalMessage("Có lỗi xảy ra khi lưu. Vui lòng thử lại!");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error saving affiliate data:", error);
      setModalMessage("Có lỗi xảy ra khi lưu. Vui lòng thử lại!");
      setShowErrorModal(true);
    }
  };

  const addFeature = () => {
    if (newFeature.title.trim()) {
      const updatedData = {
        ...affiliateData,
        features: [...(affiliateData.features || []), newFeature],
      };
      setAffiliateData(updatedData);
      setNewFeature({ title: "", description: "" });
    }
  };

  const removeFeature = (index: number) => {
    setAffiliateData({
      ...affiliateData,
      features: affiliateData.features.filter((_, i) => i !== index),
    });
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span className="hidden sm:inline">Quay lại Dashboard</span>
                <span className="sm:hidden">Quay lại</span>
              </button>
              <div className="w-px h-6 bg-neutral-300 hidden sm:block"></div>
              <h1 className="text-lg sm:text-xl font-bold text-emerald-700">
                <span className="hidden sm:inline">Quản Lý Affiliate Banner</span>
                <span className="sm:hidden">Affiliate Banner</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-600">Hiển thị banner:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <button
                onClick={handleSave}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors w-full sm:w-auto"
              >
                <i className="fas fa-save mr-2"></i>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nhà cung cấp
                </label>
                <input
                  type="text"
                  value={affiliateData.provider}
                  onChange={(e) =>
                    setAffiliateData({ ...affiliateData, provider: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tiêu đề hot
                </label>
                <input
                  type="text"
                  value={affiliateData.hotTitle}
                  onChange={(e) =>
                    setAffiliateData({ ...affiliateData, hotTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tên sản phẩm
                </label>
                <textarea
                  value={affiliateData.productTitle}
                  onChange={(e) =>
                    setAffiliateData({ ...affiliateData, productTitle: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  URL hình ảnh sản phẩm
                </label>
                <input
                  type="url"
                  value={affiliateData.productImg}
                  onChange={(e) =>
                    setAffiliateData({ ...affiliateData, productImg: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Giá hiện tại (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={affiliateData.price}
                    onChange={(e) =>
                      setAffiliateData({ ...affiliateData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Giá cũ (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={affiliateData.oldPrice}
                    onChange={(e) =>
                      setAffiliateData({ ...affiliateData, oldPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Link mua hàng
                </label>
                <input
                  type="url"
                  value={affiliateData.linkToBuy}
                  onChange={(e) =>
                    setAffiliateData({ ...affiliateData, linkToBuy: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tính năng sản phẩm
                </label>
                <div className="space-y-2 mb-4">
                  {affiliateData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm">
                        <strong>{feature.title}</strong>
                        {feature.description && `: ${feature.description}`}
                      </span>
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Tên tính năng"
                    value={newFeature.title}
                    onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Mô tả (tùy chọn)"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer z-10 relative sm:w-auto w-full"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <i className="fas fa-plus mr-2 sm:mr-0"></i>
                    <span className="sm:hidden">Thêm tính năng</span>
                  </button>
                </div>
       
              </div>
            </div>

            {/* Preview */}
            <div className="xl:sticky xl:top-8">
              <h3 className="text-lg font-bold text-neutral-700 mb-4">Xem trước</h3>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4">
                {affiliateData.productTitle && affiliateData.productImg ? (
                  <div className="relative w-full max-w-md bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-2xl shadow-2xl overflow-hidden mx-auto">
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
                        <div className="flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 border-orange-200 overflow-hidden">
                          <img
                            src={affiliateData.productImg}
                            alt={affiliateData.productTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-gray-800 mb-2 line-clamp-2">
                            {affiliateData.productTitle}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-orange-600 font-bold text-sm">
                              {affiliateData.price.toLocaleString()} vnđ
                            </span>
                            <span className="text-gray-400 text-xs line-through">
                              {affiliateData.oldPrice.toLocaleString()} vnđ
                            </span>
                          </div>
                          <div className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                            -{Math.round(((affiliateData.oldPrice - affiliateData.price) / affiliateData.oldPrice) * 100)}%
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-1 mb-4 bg-orange-50 p-3 rounded-lg">
                        {affiliateData.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <span className="text-orange-600">⚡</span>
                            <span className="text-gray-700">
                              {f.title}
                              {f.description ? `: ${f.description}` : ""}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-orange-600">✓</span>
                          <span className="text-gray-700 font-semibold">
                            Hàng Chính Hãng
                          </span>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <button className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg text-xs text-center">
                        🛒 MUA NGAY - FREESHIP 0Đ
                      </button>

                      <p className="text-center text-xs text-gray-500 mt-2">
                        Ủng hộ shop nhé! ❤️
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-neutral-500 py-8">
                    <i className="fas fa-image text-4xl mb-4"></i>
                    <p>Điền thông tin để xem trước banner</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-check-circle text-green-500 text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-green-600">
                Thành công!
              </h3>
            </div>

            <p className="text-neutral-600 mb-6">
              {modalMessage}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-red-600">
                Có lỗi xảy ra!
              </h3>
            </div>

            <p className="text-neutral-600 mb-6">
              {modalMessage}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AdminAffiliatePage = dynamic(() => Promise.resolve(AdminAffiliatePageComponent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-beige flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-neutral-600">Đang tải...</p>
      </div>
    </div>
  )
});

export default AdminAffiliatePage;