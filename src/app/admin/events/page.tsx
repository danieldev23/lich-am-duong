"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: "HOLIDAY" | "HISTORY" | "CULTURE";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "HOLIDAY" as "HOLIDAY" | "HISTORY" | "CULTURE",
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user as any)?.role !== "admin") {
      router.push("/admin/login");
      return;
    }

    fetchEvents();
  }, [session, status, router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : "/api/admin/events";
      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEvents();
        setShowModal(false);
        setEditingEvent(null);
        setFormData({ title: "", description: "", date: "", type: "HOLIDAY" });
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      date: event.date,
      type: event.type,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa sự kiện này?")) return;

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "HOLIDAY":
        return "Ngày lễ";
      case "HISTORY":
        return "Lịch sử";
      case "CULTURE":
        return "Văn hóa";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "HOLIDAY":
        return "bg-red-100 text-red-800";
      case "HISTORY":
        return "bg-blue-100 text-blue-800";
      case "CULTURE":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                <span className="hidden sm:inline">Quản Lý Sự Kiện</span>
                <span className="sm:hidden">Sự Kiện</span>
              </h1>
            </div>

            <button
              onClick={() => {
                setEditingEvent(null);
                setFormData({
                  title: "",
                  description: "",
                  date: "",
                  type: "HOLIDAY",
                });
                setShowModal(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors w-full sm:w-auto"
            >
              <i className="fas fa-plus mr-2"></i>
              Thêm Sự Kiện
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">
                    Ngày
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">
                    Tên sự kiện
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">
                    Loại
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">
                    Mô tả
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">
                    Trạng thái
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50"
                  >
                    <td className="py-4 px-6 font-medium">{event.date}</td>
                    <td className="py-4 px-6">{event.title}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          event.type
                        )}`}
                      >
                        {getTypeLabel(event.type)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600 max-w-xs truncate">
                      {event.description || "-"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${event.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {event.isActive ? "Hoạt động" : "Tạm dừng"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                          title="Chỉnh sửa"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                          title="Xóa"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {events.map((event) => (
              <div
                key={event.id}
                className="border-b border-neutral-100 p-4 hover:bg-neutral-50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      📅 {event.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                      title="Chỉnh sửa"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Xóa"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      event.type
                    )}`}
                  >
                    {getTypeLabel(event.type)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${event.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {event.isActive ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </div>

                {event.description && (
                  <p className="text-sm text-neutral-600 mt-2">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-calendar-times text-4xl text-neutral-300 mb-4"></i>
              <p className="text-neutral-500">Chưa có sự kiện nào</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <h3 className="text-lg font-bold text-emerald-700 mb-4">
              {editingEvent ? "Chỉnh Sửa Sự Kiện" : "Thêm Sự Kiện Mới"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Tên sự kiện *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Ngày (MM-DD) *
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  placeholder="01-01"
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Loại sự kiện *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="HOLIDAY">Ngày lễ</option>
                  <option value="HISTORY">Lịch sử</option>
                  <option value="CULTURE">Văn hóa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm sm:text-base resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors border border-neutral-300 rounded-lg hover:bg-neutral-50 order-2 sm:order-1"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors order-1 sm:order-2"
                >
                  {editingEvent ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
