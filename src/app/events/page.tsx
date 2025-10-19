"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  EVENTS,
  HOLIDAYS,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_ICONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

type FilterType = "all" | "holiday" | "history" | "culture";

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = useMemo(() => {
    let events = EVENTS;

    // Filter by type
    if (filter !== "all") {
      events = events.filter((event) => event.type === filter);
    }

    // Filter by search term
    if (searchTerm) {
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date
    return events.sort((a, b) => {
      const [monthA, dayA] = a.date.split("-").map(Number);
      const [monthB, dayB] = b.date.split("-").map(Number);
      return monthA - monthB || dayA - dayB;
    });
  }, [filter, searchTerm]);

  const eventsByMonth = useMemo(() => {
    const months: { [key: number]: typeof EVENTS } = {};

    filteredEvents.forEach((event) => {
      const [month] = event.date.split("-").map(Number);
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(event);
    });

    return months;
  }, [filteredEvents]);

  const monthNames = [
    "",
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

  const filterButtons = [
    {
      key: "all" as FilterType,
      label: "Tất cả",
      icon: "fas fa-calendar",
      count: EVENTS.length,
    },
    {
      key: "holiday" as FilterType,
      label: "Ngày lễ",
      icon: "fas fa-star",
      count: EVENTS.filter((e) => e.type === "holiday").length,
    },
    {
      key: "history" as FilterType,
      label: "Lịch sử",
      icon: "fas fa-landmark",
      count: EVENTS.filter((e) => e.type === "history").length,
    },
    {
      key: "culture" as FilterType,
      label: "Văn hóa",
      icon: "fas fa-heart",
      count: EVENTS.filter((e) => e.type === "culture").length,
    },
  ];

  return (
    <div className="min-h-screen bg-beige">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent via-red-500 to-accent-light text-white py-16 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
              <i className="fas fa-gift text-3xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Sự Kiện & Ngày Lễ 2025
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
              Tổng hợp đầy đủ các ngày lễ, sự kiện lịch sử và văn hóa Việt Nam
              quan trọng
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  🎉 {EVENTS.filter((e) => e.type === "holiday").length} Ngày Lễ
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  📚 {EVENTS.filter((e) => e.type === "history").length} Lịch Sử
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  🎭 {EVENTS.filter((e) => e.type === "culture").length} Văn Hóa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Holiday Stats */}
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-star text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Ngày Lễ</h3>
                <p className="text-3xl font-bold">
                  {EVENTS.filter((e) => e.type === "holiday").length}
                </p>
                <p className="text-xs opacity-90 mt-1">Sự kiện quan trọng</p>
              </div>
            </div>

            {/* History Stats */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 0v20l10 10-10-10H0l20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-landmark text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Lịch Sử</h3>
                <p className="text-3xl font-bold">
                  {EVENTS.filter((e) => e.type === "history").length}
                </p>
                <p className="text-xs opacity-90 mt-1">Dấu mốc lịch sử</p>
              </div>
            </div>

            {/* Culture Stats */}
            <div className="relative bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='3' cy='13' r='3'/%3E%3Ccircle cx='13' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-heart text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Văn Hóa</h3>
                <p className="text-3xl font-bold">
                  {EVENTS.filter((e) => e.type === "culture").length}
                </p>
                <p className="text-xs opacity-90 mt-1">Truyền thống dân tộc</p>
              </div>
            </div>

            {/* Total Stats */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-calendar text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Tổng Cộng</h3>
                <p className="text-3xl font-bold">{EVENTS.length}</p>
                <p className="text-xs opacity-90 mt-1">Tất cả sự kiện</p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="relative bg-white rounded-xl shadow-lg p-6 mb-8 overflow-hidden">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d7d46' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                  {filterButtons.map((button) => (
                    <button
                      key={button.key}
                      onClick={() => setFilter(button.key)}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md",
                        filter === button.key
                          ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      )}>
                      <i className={button.icon}></i>
                      <span className="font-medium">{button.label}</span>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-bold",
                          filter === button.key
                            ? "bg-white/20 text-white"
                            : "bg-primary/10 text-primary"
                        )}>
                        {button.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-80">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          {Object.keys(eventsByMonth).length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <i className="fas fa-search text-4xl text-neutral-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                Không tìm thấy sự kiện
              </h3>
              <p className="text-neutral-500">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(eventsByMonth)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([month, events]) => (
                  <div
                    key={month}
                    className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative bg-gradient-to-r from-primary to-primary-light p-6 overflow-hidden">
                      {/* Month Header Background Pattern */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                      <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-calendar-alt text-lg"></i>
                          </div>
                          {monthNames[parseInt(month)]}
                          <span className="ml-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            {events.length} sự kiện
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {events.map((event, index) => {
                          const [month, day] = event.date
                            .split("-")
                            .map(Number);
                          const isHoliday = HOLIDAYS.some(
                            (h) => h.date === event.date
                          );

                          return (
                            <div
                              key={index}
                              className="relative border border-neutral-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
                              {/* Event Card Background Pattern */}
                              <div
                                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                                style={{
                                  backgroundImage:
                                    event.type === "holiday"
                                      ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e74c3c' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`
                                      : event.type === "history"
                                        ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233498db' fill-opacity='0.3'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`
                                        : `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e91e63' fill-opacity='0.3'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='3' cy='13' r='3'/%3E%3Ccircle cx='13' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                                }}
                              />

                              <div className="relative z-10">
                                <div className="flex items-start space-x-3">
                                  <div
                                    className={cn(
                                      "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm",
                                      EVENT_TYPE_COLORS[event.type]
                                    )}>
                                    <i
                                      className={cn(
                                        EVENT_TYPE_ICONS[event.type],
                                        "text-lg"
                                      )}></i>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="font-semibold text-neutral-900 text-sm leading-tight">
                                        {event.title}
                                      </h3>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                                          {day}/{month}
                                        </span>
                                        {isHoliday && (
                                          <i className="fas fa-star text-red-500 text-sm"></i>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                                      {event.desc}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={cn(
                                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                          event.type === "holiday" &&
                                          "bg-red-100 text-red-800",
                                          event.type === "history" &&
                                          "bg-blue-100 text-blue-800",
                                          event.type === "culture" &&
                                          "bg-pink-100 text-pink-800"
                                        )}>
                                        {event.type === "holiday" &&
                                          "🎉 Ngày lễ"}
                                        {event.type === "history" &&
                                          "📚 Lịch sử"}
                                        {event.type === "culture" &&
                                          "🎭 Văn hóa"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
