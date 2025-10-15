"use client";

import { Header } from "@/components/Header";
import { getTetDate } from "@/lib/lunar-calendar";
import { calculateDaysBetween } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [tetDate, setTetDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentYear = new Date().getFullYear();
    let nextTet = getTetDate(currentYear);

    // If Tet has passed this year, get next year's Tet
    if (nextTet < new Date()) {
      nextTet = getTetDate(currentYear + 1);
    }

    setTetDate(nextTet);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!tetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const tetTime = tetDate.getTime();
      const difference = tetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [tetDate]);

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tính toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <Header />

      <main className="w-full">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-4"></h1>
              <p className="text-xl text-neutral-600 mb-2">
                Năm {tetDate?.getFullYear()}
              </p>
              <p className="text-lg text-neutral-500">
                {tetDate && formatDate(tetDate)}
              </p>
            </div>

            {/* Countdown Display */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Còn lại</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold">
                    {timeLeft.days}
                  </div>
                  <div className="text-sm opacity-90">Ngày</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold">
                    {timeLeft.hours}
                  </div>
                  <div className="text-sm opacity-90">Giờ</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-sm opacity-90">Phút</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-4">
                  <div className="text-3xl md:text-4xl font-bold">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-sm opacity-90">Giây</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tet Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Về Tết Nguyên Đán
              </h3>
              <div className="space-y-3 text-neutral-600">
                <p>
                  Tết Nguyên Đán là dịp lễ quan trọng nhất trong năm của người
                  Việt Nam, đánh dấu sự khởi đầu của năm mới theo âm lịch.
                </p>
                <p>
                  Đây là thời gian để gia đình sum họp, tôn vinh tổ tiên, và cầu
                  chúc một năm mới an khang, thịnh vượng.
                </p>
                <p>
                  Tết thường kéo dài 3 ngày chính thức, nhưng không khí lễ hội
                  có thể kéo dài cả tháng giêng.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-star mr-2"></i>
                Truyền Thống Tết
              </h3>
              <div className="space-y-2 text-neutral-600">
                <div className="flex items-center">
                  <i className="fas fa-home text-accent mr-2"></i>
                  <span>Về nhà sum họp cùng gia đình</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-gift text-accent mr-2"></i>
                  <span>Tặng lì xì cho trẻ em</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-utensils text-accent mr-2"></i>
                  <span>Thưởng thức bánh chưng, bánh tét</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-pray text-accent mr-2"></i>
                  <span>Cúng tổ tiên, cầu may mắn</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-seedling text-accent mr-2"></i>
                  <span>Trang trí hoa mai, hoa đào</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-handshake text-accent mr-2"></i>
                  <span>Chúc Tết bạn bè, người thân</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tet Wishes */}
          <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl shadow-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              <i className="fas fa-heart mr-2"></i>
              Lời Chúc Tết
            </h3>
            <div className="text-lg leading-relaxed">
              <p className="mb-2">🎊 Chúc Mừng Năm Mới! 🎊</p>
              <p className="mb-2">Sức khỏe dồi dào - Tài lộc đầy nhà</p>
              <p className="mb-2">Công việc thuận lợi - Gia đình hạnh phúc</p>
              <p>Vạn sự như ý - An khang thịnh vượng!</p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <i className="fas fa-lightbulb mr-2"></i>
              Những Điều Thú Vị Về Tết
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
              <div className="flex items-start">
                <i className="fas fa-calendar-alt text-accent mr-2 mt-1"></i>
                <span>
                  Tết có thể rơi vào khoảng từ 21/1 đến 20/2 dương lịch
                </span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-clock text-accent mr-2 mt-1"></i>
                <span>
                  Giao thừa là thời khắc chuyển giao giữa năm cũ và năm mới
                </span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-dragon text-accent mr-2 mt-1"></i>
                <span>Mỗi năm âm lịch được đặt tên theo 12 con giáp</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-leaf text-accent mr-2 mt-1"></i>
                <span>
                  Hoa mai (miền Nam) và hoa đào (miền Bắc) là biểu tượng của Tết
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
