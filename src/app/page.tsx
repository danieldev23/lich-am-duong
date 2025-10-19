'use client';

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TodayDisplay } from "@/components/TodayDisplay";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { DayDetailsModal } from "@/components/DayDetailsModal";
import AffiliateBanner from "@/components/AffiliateBanner";
import { IAffiliateBanner } from "../components/AffiliateBanner";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-beige">
      <Header />

      <main className="w-full">
        <div className="container mx-auto px-4 py-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Lịch âm hôm nay - 2/3 */}
            <div className="lg:col-span-2">
              <TodayDisplay selectedDate={selectedDate} />
            </div>

            {/* Upcoming Events - 1/3 */}
            <div>
              <UpcomingEvents onDateClick={setSelectedDate} />
              <AffiliateBanner />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <Features />
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <FAQ />
          </div>
        </div>
      </main>

      <Footer />
      <DayDetailsModal />
    </div>
  );
}
