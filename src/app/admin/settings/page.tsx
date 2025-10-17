"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    key: "",
    value: "",
    description: "",
  });

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      
      if (data.success && data.data) {
        const settingsMap = data.data.reduce((acc: Record<string, string>, setting: any) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {});
        setSettings(settingsMap);
        setError(null);
      } else {
        setError("Failed to fetch settings");
      }
    } catch (err) {
      setError("Network error");
      console.error("Error fetching settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchSettings();
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any)?.role !== "admin") {
      router.push("/admin/login");
      return;
    }
    fetchSettings();
  }, [session, status, router]);

  const handleEdit = (key: string) => {
    setEditingKey(key);
    setFormData({
      key,
      value: settings[key] ?? "",
      description: "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setShowModal(false);
    setEditingKey(null);
    setFormData({ key: "", value: "", description: "" });
    refetch();
  };

  const defaultSettings = [
    {
      key: "site_title",
      value: "Lịch Âm Dương Việt Nam",
      description: "Tiêu đề trang web",
    },
    {
      key: "site_description",
      value: "Lịch âm dương Việt Nam chính xác, xem ngày tốt, giờ hoàng đạo",
      description: "Mô tả trang web",
    },
    {
      key: "contact_email",
      value: "contact@lichamduong.com",
      description: "Email liên hệ",
    },
    {
      key: "timezone",
      value: "Asia/Ho_Chi_Minh",
      description: "Múi giờ hệ thống",
    },
    {
      key: "enable_notifications",
      value: "true",
      description: "Bật thông báo email",
    },
    {
      key: "enable_reminders",
      value: "true",
      description: "Bật tính năng nhắc nhở",
    },
    { key: "email_service", value: "gmail", description: "Dịch vụ email" },
    { key: "email_from", value: "", description: "Địa chỉ From" },
    { key: "email_user", value: "", description: "Email/SMTP user" },
    { key: "email_pass", value: "", description: "App password/SMTP pass" },
    { key: "email_host", value: "", description: "SMTP host" },
    { key: "email_port", value: "587", description: "SMTP port" },
    { key: "email_secure", value: "false", description: "SMTP secure" },
    {
      key: "max_reminders_per_user",
      value: "10",
      description: "Số lượng nhắc nhở tối đa mỗi người dùng",
    },
    {
      key: "turnstile_site_key",
      value: "",
      description: "Cloudflare Turnstile Site Key (Public)",
    },
    {
      key: "turnstile_secret_key",
      value: "",
      description: "Cloudflare Turnstile Secret Key (Private)",
    },
    {
      key: "enable_captcha",
      value: "true",
      description: "Bật CAPTCHA cho form nhắc nhở",
    },
  ];

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="text-neutral-600 hover:text-primary"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Quay lại Dashboard
              </button>
              <div className="w-px h-6 bg-neutral-300"></div>
              <h1 className="text-xl font-bold text-emerald-700">
                Cài Đặt Hệ Thống
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingKey(null);
                setFormData({ key: "", value: "", description: "" });
                setShowModal(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Thêm Cài Đặt
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Email Setup */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              Cấu Hình Email Nhanh
            </h2>
            <span className="text-xs text-neutral-500">
              Dùng để gửi nhắc nhở
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                Thiết lập Gmail (App Password)
              </h3>
              <p className="text-sm text-neutral-600 mb-3">
                Bật App Password trong tài khoản Google. Điền email và mật khẩu
                ứng dụng ở các khoá email_user/email_pass.
              </p>
              <button
                onClick={async () => {
                  const presets = [
                    { key: "email_service", value: "gmail" },
                    { key: "email_host", value: "" },
                    { key: "email_port", value: "" },
                    { key: "email_secure", value: "" },
                  ];
                  for (const item of presets) {
                    await fetch("/api/admin/settings", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(item),
                    });
                  }
                  refetch();
                }}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors text-sm"
              >
                Áp dụng Preset Gmail
              </button>
            </div>

            <div className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Thiết lập SMTP Tuỳ Chỉnh</h3>
              <p className="text-sm text-neutral-600 mb-3">
                Dùng với các nhà cung cấp SMTP: đặt host, port, secure.
              </p>
              <button
                onClick={async () => {
                  const presets = [
                    { key: "email_service", value: "" },
                    { key: "email_host", value: "smtp.example.com" },
                    { key: "email_port", value: "587" },
                    { key: "email_secure", value: "false" },
                  ];
                  for (const item of presets) {
                    await fetch("/api/admin/settings", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(item),
                    });
                  }
                  refetch();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Áp dụng Preset SMTP
              </button>
            </div>
          </div>
        </div>
        {/* Quick Setup */}
        {Object.keys(settings).length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              <i className="fas fa-rocket mr-2"></i>
              Thiết Lập Nhanh
            </h3>
            <p className="text-blue-700 mb-4">
              Chưa có cài đặt nào. Bạn có muốn tạo các cài đặt mặc định không?
            </p>
            <button
              onClick={async () => {
                for (const setting of defaultSettings) {
                  await fetch("/api/admin/settings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(setting),
                  });
                }
                refetch();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tạo Cài Đặt Mặc Định
            </button>
          </div>
        )}

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {key}
                  </h3>
                </div>
                <button
                  onClick={() => handleEdit(key)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-sm font-mono text-neutral-700 break-all">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* System Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-emerald-700 mb-4">
            <i className="fas fa-info-circle mr-2"></i>
            Thông Tin Hệ Thống
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="text-sm text-neutral-600">Phiên bản</div>
              <div className="font-semibold">v1.0.0</div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="text-sm text-neutral-600">Database</div>
              <div className="font-semibold">MySQL</div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="text-sm text-neutral-600">Framework</div>
              <div className="font-semibold">Next.js 15</div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="text-sm text-neutral-600">Múi giờ</div>
              <div className="font-semibold">
                {/* {getSetting("timezone", "GMT+7")}  */}
                GMT+7
              </div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="text-sm text-neutral-600">Trạng thái</div>
              <div className="font-semibold text-green-600">
                <i className="fas fa-check-circle mr-1"></i>
                Hoạt động
              </div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4">
              <div className="text-sm text-neutral-600">Uptime</div>
              <div className="font-semibold">24/7</div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-primary mb-4">
              {editingKey ? "Chỉnh Sửa Cài Đặt" : "Thêm Cài Đặt Mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Khóa cài đặt *
                </label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({ ...formData, key: e.target.value })
                  }
                  required
                  disabled={!!editingKey}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-100"
                  placeholder="site_title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Giá trị *
                </label>
                <textarea
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Mô tả
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Mô tả cài đặt này"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingKey ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
