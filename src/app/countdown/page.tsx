"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getTetDate } from "@/lib/lunar-calendar";
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

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-emerald-600 text-white py-16 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Gentle Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-white/8 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-20 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-white/8 rounded-full animate-pulse delay-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
              <i className="fas fa-hourglass-half text-3xl"></i>
            </div>
            <h1 className="text-4xl md:text-xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              🎊 Đếm Ngược Tết {tetDate?.getFullYear()} 🎊
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-2xl text-white/95 mb-2 font-semibold">
                Tết Nguyên Đán - {tetDate && formatDate(tetDate)}
              </p>
              <p className="text-lg text-white/85">
                Cùng đón chờ khoảnh khắc thiêng liêng nhất trong năm
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Sum Hop */}
            <div className="relative bg-gradient-to-br from-rose-400 to-rose-500 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-home text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Sum Họp</h3>
                <p className="text-sm opacity-90">Gia đình đoàn viên</p>
              </div>
            </div>

            {/* Li Xi */}
            <div className="relative bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-gift text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Lì Xì</h3>
                <p className="text-sm opacity-90">May mắn năm mới</p>
              </div>
            </div>

            {/* Banh Chung */}
            <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-500 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='3' cy='13' r='3'/%3E%3Ccircle cx='13' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-utensils text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Bánh Chưng</h3>
                <p className="text-sm opacity-90">Món ăn truyền thống</p>
              </div>
            </div>

            {/* Hoa Mai */}
            <div className="relative bg-gradient-to-br from-violet-400 to-violet-500 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-seedling text-2xl"></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">Hoa Mai</h3>
                <p className="text-sm opacity-90">Trang trí nhà cửa</p>
              </div>
            </div>
          </div>

          {/* Countdown Display */}
          <div className="text-center mb-8">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e74c3c' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-clock text-primary text-xl"></i>
                  </div>
                  <h2 className="text-3xl font-bold text-primary">
                    Thời Gian Còn Lại
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Days */}
                  <div className="relative bg-gradient-to-br from-slate-500 to-slate-600 text-white rounded-xl p-6 shadow-lg overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        {timeLeft.days}
                      </div>
                      <div className="text-sm opacity-90 font-medium">Ngày</div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-lg overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        {timeLeft.hours}
                      </div>
                      <div className="text-sm opacity-90 font-medium">Giờ</div>
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='3' cy='13' r='3'/%3E%3Ccircle cx='13' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-sm opacity-90 font-medium">Phút</div>
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-sm opacity-90 font-medium">Giây</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tet Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* About Tet */}
            <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232d7d46' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-info-circle text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    Về Tết Nguyên Đán
                  </h3>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    Tết Nguyên Đán là dịp lễ quan trọng nhất trong năm của người
                    Việt Nam, đánh dấu sự khởi đầu của năm mới theo âm lịch.
                  </p>
                  <p>
                    Đây là thời gian để gia đình sum họp, tôn vinh tổ tiên, và
                    cầu chúc một năm mới an khang, thịnh vượng.
                  </p>
                  <p>
                    Tết thường kéo dài 3 ngày chính thức, nhưng không khí lễ hội
                    có thể kéo dài cả tháng giêng.
                  </p>
                </div>
              </div>
            </div>

            {/* Tet Traditions */}
            <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e74c3c' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='3' cy='13' r='3'/%3E%3Ccircle cx='13' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-star text-accent"></i>
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    Truyền Thống Tết
                  </h3>
                </div>
                <div className="space-y-3 text-neutral-600">
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-home text-accent text-sm"></i>
                    </div>
                    <span>Về nhà sum họp cùng gia đình</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-gift text-accent text-sm"></i>
                    </div>
                    <span>Tặng lì xì cho trẻ em</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-utensils text-accent text-sm"></i>
                    </div>
                    <span>Thưởng thức bánh chưng, bánh tét</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-pray text-accent text-sm"></i>
                    </div>
                    <span>Cúng tổ tiên, cầu may mắn</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-seedling text-accent text-sm"></i>
                    </div>
                    <span>Trang trí hoa mai, hoa đào</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-handshake text-accent text-sm"></i>
                    </div>
                    <span>Chúc Tết bạn bè, người thân</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tet Wishes */}
          <div className="relative bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl shadow-lg p-8 text-white text-center overflow-hidden">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-heart text-2xl"></i>
                </div>
                <h3 className="text-3xl font-bold">Lời Chúc Tết</h3>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-xl leading-relaxed space-y-3">
                  <p className="text-2xl font-bold">🎊 Chúc Mừng Năm Mới! 🎊</p>
                  <p>Sức khỏe dồi dào - Tài lộc đầy nhà</p>
                  <p>Công việc thuận lợi - Gia đình hạnh phúc</p>
                  <p className="text-xl font-semibold">
                    Vạn sự như ý - An khang thịnh vượng!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="relative mt-8 bg-white rounded-xl shadow-lg p-6 overflow-hidden">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f39c12' fill-opacity='0.1'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-lightbulb text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  Những Điều Thú Vị Về Tết
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="fas fa-calendar-alt text-accent text-sm"></i>
                  </div>
                  <span className="text-sm text-neutral-600">
                    Tết có thể rơi vào khoảng từ 21/1 đến 20/2 dương lịch
                  </span>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="fas fa-clock text-accent text-sm"></i>
                  </div>
                  <span className="text-sm text-neutral-600">
                    Giao thừa là thời khắc chuyển giao giữa năm cũ và năm mới
                  </span>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="fas fa-dragon text-accent text-sm"></i>
                  </div>
                  <span className="text-sm text-neutral-600">
                    Mỗi năm âm lịch được đặt tên theo 12 con giáp
                  </span>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="fas fa-leaf text-accent text-sm"></i>
                  </div>
                  <span className="text-sm text-neutral-600">
                    Hoa mai (miền Nam) và hoa đào (miền Bắc) là biểu tượng của
                    Tết
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
