"use client";

import { Header } from "@/components/Header";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { MonthlyHolidays } from "@/components/MonthlyHolidays";
import { DayDetailsModal } from "@/components/DayDetailsModal";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-beige">
      <Header />

      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-emerald-600 text-white py-16 overflow-hidden">
        {/* Complex Background Pattern */}
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
              <i className="fas fa-calendar-alt text-3xl"></i>
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Lịch Tháng
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Xem lịch theo tháng với thông tin âm dương đầy đủ, ngày tốt xấu và
              các sự kiện quan trọng. Khám phá những ngày đặc biệt trong tháng.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">
                  📅 Lịch Âm Dương
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">
                  🎉 Ngày Lễ Tết
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="bg-beige py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Lịch Âm Dương Card */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-calendar-day text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Lịch Âm Dương</h3>
                <p className="text-sm opacity-90">Hiển thị đầy đủ thông tin</p>
              </div>
            </div>

            {/* Ngày Tốt Xấu Card */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-star text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Ngày Tốt Xấu</h3>
                <p className="text-sm opacity-90">Xem ngày hoàng đạo, hắc đạo</p>
              </div>
            </div>

            {/* Ngày Lễ Card */}
            <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='22' cy='22' r='2'/%3E%3Ccircle cx='6' cy='6' r='2'/%3E%3Ccircle cx='38' cy='6' r='2'/%3E%3Ccircle cx='6' cy='38' r='2'/%3E%3Ccircle cx='38' cy='38' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-gift text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Ngày Lễ</h3>
                <p className="text-sm opacity-90">Các ngày lễ trong tháng</p>
              </div>
            </div>

            {/* Giờ Hoàng Đạo Card */}
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10h6v6h-6V10zm8 0h6v6h-6V10zm8 0h6v6h-6V10zm8 0h6v6h-6V10zM10 18h6v6h-6v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zM10 26h6v6h-6v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zM10 34h6v6h-6v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-clock text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Giờ Hoàng Đạo</h3>
                <p className="text-sm opacity-90">Xem giờ tốt trong ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="bg-beige py-8">
        <div className="container mx-auto px-4">
          {/* Main Calendar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-calendar-alt text-primary"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Lịch Tháng
              </h2>
            </div>
            <MonthlyCalendar />
          </div>

          {/* Monthly Holidays */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-star text-accent"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Sự Kiện Trong Tháng
              </h3>
            </div>
            <MonthlyHolidays />
          </div>
        </div>
      </main>

      <DayDetailsModal />
    </div>
  );
}
