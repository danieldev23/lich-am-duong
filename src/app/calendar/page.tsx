'use client';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MonthlyCalendar } from '@/components/MonthlyCalendar';
import { MonthlyHolidays } from '@/components/MonthlyHolidays';
import { DayDetailsModal } from '@/components/DayDetailsModal';

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex min-h-screen">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Lịch Tháng</h1>
              <p className="text-neutral-600">Xem lịch theo tháng với thông tin âm dương đầy đủ</p>
            </div>
            
            <MonthlyCalendar />
            
            {/* Danh sách ngày lễ trong tháng */}
            <div className="mt-8">
              <MonthlyHolidays />
            </div>
          </div>
        </main>
      </div>

      <DayDetailsModal />
    </div>
  );
}
