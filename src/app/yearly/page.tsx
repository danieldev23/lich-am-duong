"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";

// Mock functions and constants (replace with actual imports)
const convertSolar2Lunar = (day: number, month: number, year: number) => ({
  day: Math.floor(Math.random() * 30) + 1,
  month: Math.floor(Math.random() * 12) + 1,
  year: year - 76,
});

const EVENTS = [
  {
    date: "1-1",
    title: "Tết Dương Lịch",
    desc: "Ngày đầu năm mới",
    type: "holiday",
  },
  {
    date: "2-14",
    title: "Valentine",
    desc: "Ngày lễ tình yêu",
    type: "culture",
  },
  {
    date: "3-8",
    title: "Quốc tế Phụ nữ",
    desc: "Ngày Quốc tế Phụ nữ",
    type: "holiday",
  },
  {
    date: "4-30",
    title: "Ngày Giải phóng miền Nam",
    desc: "Ngày thống nhất đất nước",
    type: "history",
  },
  {
    date: "5-1",
    title: "Quốc tế Lao động",
    desc: "Ngày Quốc tế Lao động",
    type: "holiday",
  },
  {
    date: "6-1",
    title: "Quốc tế Thiếu nhi",
    desc: "Ngày Quốc tế Thiếu nhi",
    type: "culture",
  },
  {
    date: "9-2",
    title: "Quốc khánh",
    desc: "Ngày Quốc khánh Việt Nam",
    type: "holiday",
  },
  {
    date: "10-20",
    title: "Ngày Phụ nữ Việt Nam",
    desc: "Ngày Phụ nữ Việt Nam",
    type: "culture",
  },
  {
    date: "11-20",
    title: "Ngày Nhà giáo Việt Nam",
    desc: "Ngày Nhà giáo Việt Nam",
    type: "culture",
  },
  {
    date: "12-25",
    title: "Giáng sinh",
    desc: "Lễ Giáng sinh",
    type: "holiday",
  },
];

const HOLIDAYS = [
  { date: "1-1" },
  { date: "4-30" },
  { date: "5-1" },
  { date: "9-2" },
  { date: "12-25" },
];

const getDateString = (date: Date) => {
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Mini Calendar Component
function MiniCalendar({
  year,
  month,
  onDateClick,
}: {
  year: number;
  month: number;
  onDateClick: (date: Date) => void;
}) {
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    days.push(cellDate);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-base font-semibold text-emerald-700 mb-2 text-center">
        {monthNames[month]}
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
          <div
            key={day}
            className="text-xs text-center font-medium text-gray-500 p-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const todayCheck = isToday(date);
          const isWeekend = date.getDay() === 0;
          const dateStr = getDateString(date);
          const hasEvent = EVENTS.some((event) => event.date === dateStr);
          const hasHoliday = HOLIDAYS.some((h) => h.date === dateStr);

          return (
            <button
              key={index}
              onClick={() => onDateClick(date)}
              className={cn(
                "text-xs p-2 rounded-lg hover:bg-gray-100 transition-colors relative min-h-[32px] font-medium",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !todayCheck && !isWeekend && "text-gray-700",
                isCurrentMonth && isWeekend && "text-red-500",
                todayCheck &&
                  "bg-primary text-white font-semibold hover:bg-emerald-800 border border-emerald-700"
              )}>
              {date.getDate()}
              {hasEvent && (
                <div
                  className={cn(
                    "absolute bottom-1 right-1 w-2 h-2 rounded-full",
                    hasHoliday ? "bg-red-500" : "bg-blue-500"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function YearlyPage() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const yearlyEvents = EVENTS.filter((event) => {
    const [month, day] = event.date.split("-").map(Number);
    const eventDate = new Date(selectedYear, month - 1, day);
    return eventDate.getFullYear() === selectedYear;
  }).sort((a, b) => {
    const [monthA, dayA] = a.date.split("-").map(Number);
    const [monthB, dayB] = b.date.split("-").map(Number);
    return monthA - monthB || dayA - dayB;
  });

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
              Lịch Năm {selectedYear}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tổng quan lịch cả năm với các sự kiện quan trọng, ngày lễ và thông
              tin âm dương đầy đủ. Khám phá những ngày đặc biệt trong năm{" "}
              {selectedYear}.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">
                  📅 {yearlyEvents.length} Sự kiện
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">
                  🎉 {yearlyEvents.filter((e) => e.type === "holiday").length}{" "}
                  Ngày lễ
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
            {/* Ngày Lễ Card */}
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
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
                  <i className="fas fa-star text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Ngày Lễ</h3>
                <p className="text-3xl font-bold">
                  {yearlyEvents.filter((e) => e.type === "holiday").length}
                </p>
              </div>
            </div>

            {/* Lịch Sử Card */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
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
                  <i className="fas fa-landmark text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Lịch Sử</h3>
                <p className="text-3xl font-bold">
                  {yearlyEvents.filter((e) => e.type === "history").length}
                </p>
              </div>
            </div>

            {/* Văn Hóa Card */}
            <div className="relative bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
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
                  <i className="fas fa-heart text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Văn Hóa</h3>
                <p className="text-3xl font-bold">
                  {yearlyEvents.filter((e) => e.type === "culture").length}
                </p>
              </div>
            </div>

            {/* Tổng Cộng Card */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
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
                  <i className="fas fa-calendar text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Tổng Cộng</h3>
                <p className="text-3xl font-bold">{yearlyEvents.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="bg-beige py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Year Selector */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setSelectedYear(selectedYear - 1)}
                    className="p-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all shadow-md">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      Năm {selectedYear}
                    </h2>
                    <select
                      value={selectedYear}
                      onChange={(e) =>
                        setSelectedYear(parseInt(e.target.value))
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      {Array.from(
                        { length: 21 },
                        (_, i) => selectedYear - 10 + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setSelectedYear(selectedYear + 1)}
                    className="p-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all shadow-md">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              {/* Calendar Grid */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-calendar-alt text-primary"></i>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Lịch 12 Tháng
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }, (_, month) => (
                    <MiniCalendar
                      key={month}
                      year={selectedYear}
                      month={month}
                      onDateClick={handleDateClick}
                    />
                  ))}
                </div>
              </div>
              {yearlyEvents.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-star text-accent"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Sự Kiện Trong Năm {selectedYear}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {yearlyEvents.map((event, index) => {
                      const [month, day] = event.date.split("-").map(Number);
                      const isHoliday = HOLIDAYS.some(
                        (h) => h.date === event.date
                      );

                      // Different background patterns for different event types
                      const getEventStyle = (type: string) => {
                        switch (type) {
                          case "holiday":
                            return {
                              gradient:
                                "bg-gradient-to-br from-red-50 to-red-100",
                              pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                              border: "border-red-200",
                            };
                          case "history":
                            return {
                              gradient:
                                "bg-gradient-to-br from-blue-50 to-blue-100",
                              pattern: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/g%3E%3C/svg%3E")`,
                              border: "border-blue-200",
                            };
                          case "culture":
                            return {
                              gradient:
                                "bg-gradient-to-br from-pink-50 to-pink-100",
                              pattern: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Cpath d='M15 5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S20.5 5 15 5zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z'/%3E%3C/g%3E%3C/svg%3E")`,
                              border: "border-pink-200",
                            };
                          default:
                            return {
                              gradient:
                                "bg-gradient-to-br from-green-50 to-green-100",
                              pattern: `url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Crect x='10' y='10' width='5' height='5'/%3E%3C/g%3E%3C/svg%3E")`,
                              border: "border-green-200",
                            };
                        }
                      };

                      const eventStyle = getEventStyle(event.type);

                      return (
                        <div
                          key={index}
                          className={`relative ${eventStyle.gradient} ${eventStyle.border} border rounded-xl p-5 hover:shadow-lg transition-all duration-300 overflow-hidden group`}>
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-30">
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: eventStyle.pattern,
                              }}
                            />
                          </div>

                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-semibold text-primary bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center shadow-sm">
                                <i className="fas fa-calendar-day mr-2 text-xs"></i>
                                {day}/{month}
                              </span>
                              {isHoliday && (
                                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                                  <span className="text-white text-sm">⭐</span>
                                </div>
                              )}
                            </div>

                            <h4 className="font-bold text-gray-900 mb-3 text-base flex items-center group-hover:text-primary transition-colors">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                                <i className="fas fa-gift text-primary text-sm"></i>
                              </div>
                              {event.title}
                            </h4>

                            <p className="text-sm text-gray-700 leading-relaxed">
                              {event.desc}
                            </p>

                            {/* Event Type Badge */}
                            <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/60 backdrop-blur-sm">
                              {event.type === "holiday" && "🎉 Ngày lễ"}
                              {event.type === "history" && "🏛️ Lịch sử"}
                              {event.type === "culture" && "🎭 Văn hóa"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:w-[340px] space-y-6">
              {selectedDate && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="fas fa-info-circle text-blue-600"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Thông Tin Ngày
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {/* Solar Date Card */}
                    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='15' cy='15' r='8'/%3E%3Cpath d='M15 3v4M15 23v4M27 15h-4M7 15H3M23.5 6.5l-2.8 2.8M9.3 20.7l-2.8 2.8M23.5 23.5l-2.8-2.8M9.3 9.3L6.5 6.5'/%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-sun text-blue-600"></i>
                          </div>
                          <p className="text-sm font-semibold text-blue-800">
                            Dương lịch
                          </p>
                        </div>
                        <p className="font-bold text-blue-900 text-lg">
                          {selectedDate?.getDate()}/
                          {selectedDate?.getMonth() + 1}/
                          {selectedDate?.getFullYear()}
                        </p>
                      </div>
                    </div>

                    {/* Lunar Date Card */}
                    <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b5cf6' fill-opacity='0.2'%3E%3Cpath d='M16 2c-7.7 0-14 6.3-14 14s6.3 14 14 14c2.4 0 4.7-.6 6.7-1.7-2.4 1.1-5.1 1.7-7.9 1.7-10.5 0-19-8.5-19-19S4.3-3 14.8-3c2.8 0 5.5.6 7.9 1.7C20.7 2.6 18.4 2 16 2z'/%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                            <i className="fas fa-moon text-purple-600"></i>
                          </div>
                          <p className="text-sm font-semibold text-purple-800">
                            Âm lịch
                          </p>
                        </div>
                        <p className="font-bold text-purple-900 text-lg">
                          {(() => {
                            const lunar = convertSolar2Lunar(
                              selectedDate?.getDate() ?? 1,
                              (selectedDate?.getMonth() ?? 0) + 1,
                              selectedDate?.getFullYear() ?? selectedYear
                            );
                            return `${lunar.day}/${lunar.month}/${lunar.year}`;
                          })()}
                        </p>
                      </div>
                    </div>
                    {(() => {
                      const dateStr = selectedDate
                        ? getDateString(selectedDate)
                        : "";
                      const dayEvents = EVENTS.filter(
                        (event) => event.date === dateStr
                      );
                      if (dayEvents.length > 0) {
                        return (
                          <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                              <div
                                className="absolute inset-0"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.2'%3E%3Cpath d='M14 2l3.5 7.1L25 10.4l-5.5 5.4 1.3 7.6L14 19.7l-6.8 3.7 1.3-7.6L3 10.4l7.5-1.3L14 2z'/%3E%3C/g%3E%3C/svg%3E")`,
                                }}
                              />
                            </div>
                            <div className="relative z-10">
                              <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                                  <i className="fas fa-star text-green-600"></i>
                                </div>
                                <p className="text-sm font-semibold text-green-800">
                                  Sự kiện hôm nay
                                </p>
                              </div>
                              <div className="space-y-2">
                                {dayEvents.map((event, index) => (
                                  <div
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-green-200/50">
                                    <p className="font-semibold text-green-700 text-sm">
                                      {event.title}
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                      {event.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
              )}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-chart-bar text-orange-600"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Thống Kê Năm {selectedYear}
                  </h3>
                </div>
                <div className="space-y-3">
                  {/* Total Events */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 flex justify-between items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236b7280' fill-opacity='0.2'%3E%3Crect x='3' y='4' width='18' height='18' rx='2'/%3E%3Cpath d='M16 2v4M8 2v4M3 10h18'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="relative z-10 flex items-center">
                      <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-calendar text-gray-600"></i>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        Tổng sự kiện
                      </span>
                    </div>
                    <span className="relative z-10 font-bold text-gray-900 text-xl">
                      {yearlyEvents.length}
                    </span>
                  </div>

                  {/* Holiday Events */}
                  <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 flex justify-between items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.2'%3E%3Cpath d='M13 2l3.2 6.5L23 9.7l-5.2 5.1 1.2 7.2L13 18.5 7 22l1.2-7.2L3 9.7l6.8-1.2L13 2z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="relative z-10 flex items-center">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-star text-red-600"></i>
                      </div>
                      <span className="text-sm font-semibold text-red-700">
                        Ngày lễ
                      </span>
                    </div>
                    <span className="relative z-10 font-bold text-red-900 text-xl">
                      {yearlyEvents.filter((e) => e.type === "holiday").length}
                    </span>
                  </div>

                  {/* History Events */}
                  <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex justify-between items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Cpath d='M14 2C7.4 2 2 7.4 2 14s5.4 12 12 12 12-5.4 12-12S20.6 2 14 2zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z'/%3E%3Cpath d='M14 6v8l6 3.5-1 1.7-7-4V6h2z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="relative z-10 flex items-center">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-landmark text-blue-600"></i>
                      </div>
                      <span className="text-sm font-semibold text-blue-700">
                        Lịch sử
                      </span>
                    </div>
                    <span className="relative z-10 font-bold text-blue-900 text-xl">
                      {yearlyEvents.filter((e) => e.type === "history").length}
                    </span>
                  </div>

                  {/* Culture Events */}
                  <div className="relative bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 flex justify-between items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.2'%3E%3Cpath d='M15 3c-6.6 0-12 5.4-12 12 0 3.3 1.3 6.3 3.5 8.5l1.4-1.4C6.1 20.3 5 17.8 5 15c0-5.5 4.5-10 10-10s10 4.5 10 10c0 2.8-1.1 5.3-2.9 7.1l1.4 1.4C25.7 21.3 27 18.3 27 15c0-6.6-5.4-12-12-12z'/%3E%3Ccircle cx='15' cy='15' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="relative z-10 flex items-center">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-heart text-pink-600"></i>
                      </div>
                      <span className="text-sm font-semibold text-pink-700">
                        Văn hóa
                      </span>
                    </div>
                    <span className="relative z-10 font-bold text-pink-900 text-xl">
                      {yearlyEvents.filter((e) => e.type === "culture").length}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-bolt text-green-600"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Thao Tác Nhanh
                  </h3>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedYear(new Date().getFullYear())}
                    className="w-full bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 text-primary font-medium px-4 py-3 rounded-lg transition-all flex items-center">
                    <i className="fas fa-home mr-3"></i>
                    Về năm hiện tại
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date() as Date)}
                    className="w-full bg-gradient-to-r from-accent/10 to-accent/20 hover:from-accent/20 hover:to-accent/30 text-accent font-medium px-4 py-3 rounded-lg transition-all flex items-center">
                    <i className="fas fa-calendar-day mr-3"></i>
                    Chọn ngày hôm nay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
