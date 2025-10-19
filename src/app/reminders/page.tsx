"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-emerald-600 text-white py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20-20c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm0 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm-40 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
              <i className="fas fa-bell text-3xl"></i>
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Nhắc Nhở Thông Minh
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tạo và quản lý các nhắc nhở quan trọng, nhận thông báo qua email tự động
            </p>
          </div>
        </div>
      </div>

      <main className="bg-beige py-8">
        <div className="container mx-auto px-4">
          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-envelope text-2xl mb-2"></i>
              <h3 className="font-semibold">Email Tự Động</h3>
              <p className="text-xs opacity-90">Gửi nhắc nhở qua email</p>
            </div>

            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-repeat text-2xl mb-2"></i>
              <h3 className="font-semibold">Lặp Lại Hàng Năm</h3>
              <p className="text-xs opacity-90">Nhắc nhở sinh nhật, kỷ niệm</p>
            </div>

            <div className="bg-gradient-to-r from-primary-light to-primary text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-clock text-2xl mb-2"></i>
              <h3 className="font-semibold">Đặt Thời Gian</h3>
              <p className="text-xs opacity-90">Chọn giờ cụ thể</p>
            </div>

            <div className="bg-gradient-to-r from-accent/80 to-accent text-white rounded-xl p-4 text-center shadow-lg">
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

      <Footer />
    </div>
  );
}
