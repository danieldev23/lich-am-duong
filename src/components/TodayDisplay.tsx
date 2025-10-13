'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { convertSolar2Lunar, getCanChi, getTietKhi, getTruc, getGioHoangDao } from '@/lib/lunar-calendar';
import { EVENTS, HOLIDAYS } from '@/lib/constants';

// Random quotes
const QUOTES = [
  { text: "Làm việc khó mộng để thành, việc dễ thành lòng thường kiêu ngạo", author: "Khổng Tử" },
  { text: "Học mà không nghĩ thì mông lung, nghĩ mà không học thì nguy hiểm", author: "Khổng Tử" },
  { text: "Có chí thì nên, không gì là khó", author: "Tục ngữ Việt Nam" },
  { text: "Trăm hay không bằng tay quen", author: "Tục ngữ Việt Nam" },
  { text: "Học thầy không tày học bạn", author: "Tục ngữ Việt Nam" },
  { text: "Công cha như núi Thái Sơn, Nghĩa mẹ như nước trong nguồn chảy ra", author: "Ca dao Việt Nam" },
  { text: "Cái khó ló cái khôn", author: "Tục ngữ Việt Nam" },
  { text: "Ăn quả nhớ kẻ trồng cây", author: "Tục ngữ Việt Nam" },
  { text: "Một cây làm chẳng nên non, Ba cây chụm lại nên hòn núi cao", author: "Ca dao Việt Nam" },
  { text: "Việc gì khó, đã có trời xanh", author: "Tục ngữ Việt Nam" },
];

export function TodayDisplay() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);
  
  // State cho date picker
  const [pickerDay, setPickerDay] = useState(new Date().getDate());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth() + 1);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setMounted(true);
    randomizeQuote();
  }, []);

  // Random lại quote khi selectedDate thay đổi
  useEffect(() => {
    if (mounted) {
      randomizeQuote();
    }
  }, [selectedDate]);

  const randomizeQuote = () => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
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
  const tietKhi = getTietKhi(day, month, year);
  const truc = getTruc(day, month, year);
  const { hoangDao, hacDao } = getGioHoangDao(day, month, year);

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
  const todayEvents = EVENTS.filter(event => event.date === dateStr);
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

      <div className="p-6">
        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">☯ LỊCH ÂM HÔM NAY</h3>
        </div>

        {/* Số ngày lớn */}
        <div className="text-center mb-4">
          <div className="text-[100px] leading-none font-bold text-accent mb-2">
            {day}
          </div>
          <div className="text-gray-700 text-sm mb-2">
            • Ngày dương lịch: <span className="font-semibold">{day}/{month}/{year} {getDayName(dayOfWeek)}</span>
          </div>
          {todayHolidays.length > 0 && (
            <div className="inline-block bg-accent text-white px-6 py-2 rounded-full font-medium text-sm">
              ⭐ {todayHolidays[0].name}
            </div>
          )}
        </div>

        {/* Thông tin Âm Dương - 2 màu */}
        <div className="bg-gradient-to-r from-yellow-50 via-beige-100 to-yellow-50 rounded-lg p-6 mb-6 border border-yellow-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Cột trái - Ngày âm lịch */}
            <div className="space-y-1">
              <div className="text-xs text-gray-600">Ngày</div>
              <div className="font-bold text-gray-800">{canChi}</div>
              <div className="text-xs text-gray-600 mt-2">Tháng</div>
              <div className="font-semibold text-gray-700">Ất Dậu</div>
              <div className="text-xs text-gray-600 mt-2">Năm</div>
              <div className="font-semibold text-gray-700">Ất Tỵ</div>
            </div>

            {/* Cột giữa - Tháng âm lớn */}
            <div className="border-x border-yellow-300">
              <div className="text-sm text-gray-700 font-semibold mb-1">
                THÁNG {lunar.month} {lunar.isLeapMonth ? '(NHUẬN)' : '(THIẾU)'}
              </div>
              <div className="text-6xl font-bold text-primary my-2">
                {lunar.day}
              </div>
              {/* Con giáp icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full text-white text-2xl">
                🐍
              </div>
            </div>

            {/* Cột phải - Thông tin */}
            <div className="space-y-1">
              <div className="text-xs text-gray-600">Ngày</div>
              <div className="font-bold text-primary">Tứ Mệnh Hoàng Đạo</div>
              <div className="text-xs text-gray-600 mt-2">Trực</div>
              <div className="font-semibold text-gray-700">{truc}</div>
              <div className="text-xs text-gray-600 mt-2">Tiết khí</div>
              <div className="font-semibold text-gray-700">{tietKhi || 'Hàn Lộ'}</div>
            </div>
          </div>
        </div>

        {/* Giờ Hoàng Đạo */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            <i className="fas fa-star text-yellow-500 mr-1"></i>
            Giờ đẹp (tốt cho mọi việc):
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
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            <i className="fas fa-times-circle text-red-500 mr-1"></i>
            Giờ xấu (nên tránh):
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

        {/* Quote */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-sm italic text-gray-600 mb-1">"{quote.text}"</p>
          <p className="text-xs text-gray-500">- {quote.author} -</p>
        </div>

        {/* View detail link */}
        <div className="text-center mt-4">
          <Link 
            href="/calendar"
            className="text-primary hover:text-primary-dark text-sm font-medium hover:underline"
          >
            Xem chi tiết ngày tốt xấu hôm nay →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function
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
