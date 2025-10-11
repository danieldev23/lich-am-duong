import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TodayDisplay } from '@/components/TodayDisplay';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import { MonthlyCalendar } from '@/components/MonthlyCalendar';
import { FAQ } from '@/components/FAQ';
import { Features } from '@/components/Features';
import { DayDetailsModal } from '@/components/DayDetailsModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex min-h-screen">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Top Section: Trái (Lịch ngày) + Phải (Sự kiện sắp tới) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <TodayDisplay />
              <UpcomingEvents />
            </div>

            {/* Bottom Section: Lịch tháng */}
            <div className="mb-12">
              <MonthlyCalendar />
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <FAQ />
            </div>

            {/* Features Section */}
            <div className="mb-12">
              <Features />
            </div>

          </div>
        </main>
      </div>

      <DayDetailsModal />
    </div>
  );
}
