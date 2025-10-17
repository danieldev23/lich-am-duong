"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ReminderForm } from "@/components/ReminderForm";
import { ReminderList } from "@/components/ReminderList";

export default function RemindersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReminderCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-beige">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <i className="fas fa-bell text-2xl"></i>
            </div>
            <h1 className="text-4xl font-bold mb-3">Nhắc Nhở Thông Minh</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tạo và quản lý các nhắc nhở quan trọng, nhận thông báo qua email
              tự động
            </p>
          </div>
        </div>
      </div>

      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-envelope text-2xl mb-2"></i>
              <h3 className="font-semibold">Email Tự Động</h3>
              <p className="text-xs opacity-90">Gửi nhắc nhở qua email</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-repeat text-2xl mb-2"></i>
              <h3 className="font-semibold">Lặp Lại Hàng Năm</h3>
              <p className="text-xs opacity-90">Nhắc nhở sinh nhật, kỷ niệm</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-clock text-2xl mb-2"></i>
              <h3 className="font-semibold">Đặt Thời Gian</h3>
              <p className="text-xs opacity-90">Chọn giờ cụ thể</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-calendar-check text-2xl mb-2"></i>
              <h3 className="font-semibold">Quản Lý Dễ Dàng</h3>
              <p className="text-xs opacity-90">Xem, sửa, xóa nhắc nhở</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form tạo nhắc nhở */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-plus text-primary"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Tạo Nhắc Nhở Mới
                </h2>
              </div>
              <ReminderForm onSuccess={handleReminderCreated} />
            </div>

            {/* Danh sách nhắc nhở */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-list text-accent"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Danh Sách Nhắc Nhở
                </h2>
              </div>
              <ReminderList key={refreshKey} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
