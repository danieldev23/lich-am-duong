"use client";

import { Header } from "@/components/Header";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { MonthlyHolidays } from "@/components/MonthlyHolidays";
import { DayDetailsModal } from "@/components/DayDetailsModal";
import { useSettings } from "@/hooks/useSettings";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-beige">
      <Header />
      <main className="w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              Lịch Tháng
            </h1>
            <p className="text-gray-600">
              Xem lịch theo tháng với thông tin âm dương đầy đủ
            </p>
          </div>

          <MonthlyCalendar />

          <div className="mt-8">
            <MonthlyHolidays />
          </div>
        </div>
      </main>

      <DayDetailsModal />
    </div>
  );
}
