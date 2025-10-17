"use client";

import { Header } from "@/components/Header";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { MonthlyHolidays } from "@/components/MonthlyHolidays";
import { DayDetailsModal } from "@/components/DayDetailsModal";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-beige">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <i className="fas fa-calendar-alt text-2xl"></i>
            </div>
            <h1 className="text-4xl font-bold mb-3">Lịch Tháng</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Xem lịch theo tháng với thông tin âm dương đầy đủ, ngày tốt xấu và
              các sự kiện quan trọng
            </p>
          </div>
        </div>
      </div>

      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-calendar-day text-2xl mb-2"></i>
              <h3 className="font-semibold">Lịch Âm Dương</h3>
              <p className="text-xs opacity-90">Hiển thị đầy đủ thông tin</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-star text-2xl mb-2"></i>
              <h3 className="font-semibold">Ngày Tốt Xấu</h3>
              <p className="text-xs opacity-90">Xem ngày hoàng đạo, hắc đạo</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-gift text-2xl mb-2"></i>
              <h3 className="font-semibold">Ngày Lễ</h3>
              <p className="text-xs opacity-90">Các ngày lễ trong tháng</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 text-center shadow-lg">
              <i className="fas fa-clock text-2xl mb-2"></i>
              <h3 className="font-semibold">Giờ Hoàng Đạo</h3>
              <p className="text-xs opacity-90">Xem giờ tốt trong ngày</p>
            </div>
          </div>

          {/* Main Calendar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <MonthlyCalendar />
          </div>

          {/* Monthly Holidays */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <MonthlyHolidays />
          </div>
        </div>
      </main>

      <DayDetailsModal />
    </div>
  );
}
