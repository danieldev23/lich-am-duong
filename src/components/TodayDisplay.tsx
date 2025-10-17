'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { convertSolar2Lunar, getCanChi, getTietKhi, getTruc, getGioHoangDao, getCanChiYear } from '@/lib/lunar-calendar';
import { EVENTS,  HOLIDAYS, QUOTES, getZodiacAnimal } from '@/lib/constants';

// Random quotes


const backgroundImages = [
  // Spring
  "https://images.unsplash.com/uploads/1412748786298aacc1dc7/f2e5b5da?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1602790032293-c423e6695b1d?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526344966-89049886b28d?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1708292215628-450310462908?w=1920&h=1080&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1711174678635-ebfc6045ea25?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493589976221-c2357c31ad77?w=1920&h=1080&fit=crop&q=80",

  // Summer
  "https://plus.unsplash.com/premium_photo-1666273145291-3a6323d4388f?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618462611075-b68978a37db3?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1753246281088-51bbd10df0f2?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587462710036-1969570afa6b?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1622901641231-a570d784e5e3?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1603346996604-cd77fc859e1d?w=1920&h=1080&fit=crop&q=80",

  // Autumn
  "https://images.unsplash.com/photo-1506193503569-d57d2a678510?w=1920&h=1080&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1665956065478-eb9409e11a9b?w=1920&h=1080&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1669295395788-2c22b1431f24?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1572541406051-5577a5688b88?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1613322389906-bbe0451c1dde?w=1920&h=1080&fit=crop&q=80",
  "https://plus.unsplash.com/premium_photo-1694169633460-c7cb39acc472?w=1920&h=1080&fit=crop&q=80",
];


interface TodayDisplayProps {
  selectedDate?: Date | null;
}

export function TodayDisplay({ selectedDate: externalSelectedDate }: TodayDisplayProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [backgroundImg, setBackgroundImg] = useState(backgroundImages[0]);
  
  // State cho date picker
  const [pickerDay, setPickerDay] = useState(new Date().getDate());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth() + 1);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setMounted(true);
    randomizeQuote();
  }, []);

  // Cập nhật selectedDate khi có external date
  useEffect(() => {
    if (externalSelectedDate) {
      setSelectedDate(externalSelectedDate);
      setPickerDay(externalSelectedDate.getDate());
      setPickerMonth(externalSelectedDate.getMonth() + 1);
      setPickerYear(externalSelectedDate.getFullYear());
    }
  }, [externalSelectedDate]);

  // Random lại quote khi selectedDate thay đổi
  useEffect(() => {
    if (mounted) {
      randomizeQuote();
    }
  }, [selectedDate, mounted]);

  const randomizeQuote = () => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setBackgroundImg(backgroundImages[Math.floor(Math.random() * backgroundImages.length)])
  };

  const goToPreviousDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      // Update picker values
      setPickerDay(newDate.getDate());
      setPickerMonth(newDate.getMonth() + 1);
      setPickerYear(newDate.getFullYear());
      return newDate;
    });
  };

  const goToNextDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      // Update picker values
      setPickerDay(newDate.getDate());
      setPickerMonth(newDate.getMonth() + 1);
      setPickerYear(newDate.getFullYear());
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setPickerDay(today.getDate());
    setPickerMonth(today.getMonth() + 1);
    setPickerYear(today.getFullYear());
  };

  const handleViewDate = () => {
    const newDate = new Date(pickerYear, pickerMonth - 1, pickerDay);
    setSelectedDate(newDate);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  if (!mounted) {
    return (
      <div className="rounded-xl shadow-lg overflow-hidden h-[600px]">
        <div className="animate-pulse bg-gray-200 h-full"></div>
      </div>
    );
  }

  const day = selectedDate.getDate();
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();
  const dayOfWeek = selectedDate.getDay();
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const lunar = convertSolar2Lunar(day, month, year);
  const canChi = getCanChi(day, month, year);
  const canChiYear = getCanChiYear(year);
  const tietKhi = getTietKhi(day, month, year);
  const truc = getTruc(day, month, year);
  const { hoangDao, hacDao } = getGioHoangDao(day, month, year);
  const zodiacAnimal = getZodiacAnimal(year);

  const getDayName = (dayIndex: number) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return days[dayIndex];
  };

  const getDateString = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  const dateStr = getDateString(selectedDate);
  const todayHolidays = HOLIDAYS.filter(h => h.date === dateStr);

  const daysInPickerMonth = getDaysInMonth(pickerMonth, pickerYear);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Date Picker Section */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3 justify-center">
          {/* Day Select */}
          <select
            value={pickerDay}
            onChange={(e) => setPickerDay(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-800 font-medium"
          >
            {Array.from({ length: daysInPickerMonth }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Month Select */}
          <select
            value={pickerMonth}
            onChange={(e) => {
              const newMonth = Number(e.target.value);
              setPickerMonth(newMonth);
              // Adjust day if it exceeds days in new month
              const maxDays = getDaysInMonth(newMonth, pickerYear);
              if (pickerDay > maxDays) setPickerDay(maxDays);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-800 font-medium"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Year Select */}
          <select
            value={pickerYear}
            onChange={(e) => setPickerYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-800 font-medium"
          >
            {Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* View Date Button */}
          <button
            onClick={handleViewDate}
            className="bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-lg font-bold transition-all hover:scale-105"
          >
            XEM NGÀY
          </button>
        </div>
      </div>

      {/* Header với navigation */}
      <div className="bg-gradient-to-r from-primary to-primary-dark p-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={goToPreviousDay}
            className="text-white hover:bg-white/20 p-2 rounded transition-all"
            title="Ngày trước"
          >
            ◄
          </button>
          <div className="flex items-center space-x-2 text-white">
            <h2 className="text-xl font-bold">
              Tháng {month} Năm {year}
            </h2>
            {!isToday && (
              <button
                onClick={goToToday}
                className="bg-white text-primary px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-all"
              >
                Hôm nay
              </button>
            )}
          </div>
          <button 
            onClick={goToNextDay}
            className="text-white hover:bg-white/20 p-2 rounded transition-all"
            title="Ngày sau"
          >
            ►
          </button>
        </div>
      </div>

      <div 
        className="p-6 huy bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        {/* Overlay để làm nổi nội dung */}
        <div className="absolute inset-0 bg-white/40"></div>
        
        {/* Content wrapper - Horizontal layout for desktop, vertical for mobile */}
        <div className="relative z-10">
          {/* Heading */}
          {/* <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">☯ LỊCH DƯƠNG HÔM NAY</h3>
          </div> */}

          {/* Main horizontal container */}
          <div className="flex flex-col lg:flex-row gap-6 mb-4">
            {/* Left Side - Solar Date (Dương lịch) */}
            <div className="flex-1 bg-white/80 rounded-lg p-6 border-2 border-gray-200">
              <div className="text-center mb-2">
                <h4 className="text-lg font-bold text-gray-700 mb-3">DƯƠNG LỊCH</h4>
              </div>
              
              <div className="text-center">
                <div className="text-[120px] leading-none font-bold text-accent mb-2">
                  <span
                    style={{
                      WebkitTextStroke: "2px white",
                      color: "red",
                    }}
                  >
                    {day}
                  </span>
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Tháng {month} Năm {year}
                </div>
                <div className="text-base font-medium text-gray-700 mb-3">
                  {getDayName(dayOfWeek)}
                </div>
                {todayHolidays.length > 0 && (
                  <div className="inline-block bg-accent text-white px-6 py-2 rounded-full font-medium text-sm">
                    ⭐ {todayHolidays[0].name}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Lunar Date (Âm lịch) */}
            <div className="flex-1 bg-gradient-to-r from-yellow-50 via-beige-100 to-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
              <div className="text-center mb-2">
                <h4 className="text-lg font-bold text-gray-700 mb-3">ÂM LỊCH</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                {/* Cột trái - Can Chi */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Ngày</div>
                  <div className="font-bold text-gray-800">{canChi}</div>
                  <div className="text-xs text-gray-600 mt-2">Tháng</div>
                  <div className="font-semibold text-gray-700">Ất Dậu</div>
                  <div className="text-xs text-gray-600 mt-2">Năm</div>
                  <div className="font-semibold text-gray-700">{canChiYear}</div>
                </div>

                {/* Cột giữa - Ngày âm lớn */}
                <div className="border-x border-yellow-300">
                  <div className="text-sm text-gray-700 font-semibold mb-1">
                    THÁNG {lunar.month} {lunar.isLeapMonth ? '(NHUẬN)' : '(THIẾU)'}
                  </div>
                  <div className="text-6xl font-bold text-primary my-2">
                    {lunar.day}
                  </div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full text-white text-2xl" title={zodiacAnimal.name}>
                    {zodiacAnimal.emoji}
                  </div>
                </div>

                {/* Cột phải - Thông tin */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Ngày</div>
                  <div className="font-bold text-primary text-sm">Tứ Mệnh Hoàng Đạo</div>
                  <div className="text-xs text-gray-600 mt-2">Trực</div>
                  <div className="font-semibold text-gray-700">{truc}</div>
                  <div className="text-xs text-gray-600 mt-2">Tiết khí</div>
                  <div className="font-semibold text-gray-700">{tietKhi || 'Hàn Lộ'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Giờ Hoàng Đạo và Hắc Đạo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Giờ Hoàng Đạo */}
            <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-star text-yellow-500 mr-1"></i>
                Giờ hoàng đạo (tốt cho mọi việc):
              </h4>
              <div className="flex flex-wrap gap-2">
                {hoangDao.map((gio, index) => (
                  <div key={index} className="bg-green-50 border border-green-300 px-4 py-2 rounded">
                    <span className="font-bold text-green-700">{gio.chi}</span>
                    <span className="text-xs text-green-600 ml-1">({gio.time})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Giờ Hắc Đạo */}
            <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-times-circle text-red-500 mr-1"></i>
                Giờ hắc đạo (nên tránh):
              </h4>
              <div className="flex flex-wrap gap-2">
                {hacDao.map((gio, index) => (
                  <div key={index} className="bg-red-50 border border-red-300 px-4 py-2 rounded">
                    <span className="font-bold text-red-700">{gio.chi}</span>
                    <span className="text-xs text-red-600 ml-1">({gio.time})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-white/80 rounded-lg p-4 border border-gray-200 text-center">
            <p className="text-sm italic text-gray-600 mb-1">&ldquo;{quote.text}&rdquo;</p>
            <p className="text-xs text-gray-500">- {quote.author} -</p>
          </div>

          {/* View detail link */}
          <div className="text-center mt-4">
            <Link 
              href="/converter"
              className="text-primary hover:text-primary-dark text-sm font-medium hover:underline bg-white/80 px-4 py-2 rounded inline-block"
            >
              Chuyển lịch âm dương tại đây →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTrucDescription(truc: string): string {
  const descriptions: Record<string, string> = {
    'Kiến': 'Tốt cho xây dựng, khởi công',
    'Trừ': 'Tốt cho dẹp bỏ, phá hủy',
    'Mãn': 'Tốt cho cưới hỏi, khai trương',
    'Bình': 'Bình thường, ổn định',
    'Định': 'Tốt cho ký kết hợp đồng',
    'Chấp': 'Tốt cho việc học hành',
    'Phá': 'Tiến hành trị bệnh thì sẽ nhanh khỏi',
    'Nguy': 'Nên cẩn thận',
    'Thành': 'Tốt cho mọi việc',
    'Thu': 'Tốt cho thu hoạch',
    'Khai': 'Tốt cho khai trương',
    'Bế': 'Nên nghỉ ngơi'
  };
  return descriptions[truc] || 'Xem thêm thông tin chi tiết';
}