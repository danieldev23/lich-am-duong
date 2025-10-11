'use client';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { convertSolar2Lunar, convertLunar2Solar, getCanChi, getDayName } from '@/lib/lunar-calendar';
import { useState } from 'react';

export default function ConverterPage() {
  const [solarToLunar, setSolarToLunar] = useState({
    day: '',
    month: '',
    year: '',
    result: null as any
  });

  const [lunarToSolar, setLunarToSolar] = useState({
    day: '',
    month: '',
    year: '',
    isLeapMonth: false,
    result: null as any
  });

  const handleSolarToLunar = () => {
    const day = parseInt(solarToLunar.day);
    const month = parseInt(solarToLunar.month);
    const year = parseInt(solarToLunar.year);

    if (!day || !month || !year) {
      alert('Vui lòng nhập đầy đủ ngày, tháng, năm');
      return;
    }

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      alert('Ngày tháng năm không hợp lệ');
      return;
    }

    try {
      const lunar = convertSolar2Lunar(day, month, year);
      const canChi = getCanChi(day, month, year);
      const date = new Date(year, month - 1, day);

      setSolarToLunar({
        ...solarToLunar,
        result: {
          lunar,
          canChi,
          dayName: getDayName(date.getDay())
        }
      });
    } catch (error) {
      alert('Có lỗi xảy ra khi chuyển đổi');
    }
  };

  const handleLunarToSolar = () => {
    const day = parseInt(lunarToSolar.day);
    const month = parseInt(lunarToSolar.month);
    const year = parseInt(lunarToSolar.year);

    if (!day || !month || !year) {
      alert('Vui lòng nhập đầy đủ ngày, tháng, năm');
      return;
    }

    if (day < 1 || day > 30 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      alert('Ngày tháng năm không hợp lệ');
      return;
    }

    try {
      const solar = convertLunar2Solar(day, month, year, lunarToSolar.isLeapMonth);

      if (solar.day === 0) {
        alert('Ngày âm lịch không hợp lệ hoặc không tồn tại tháng nhuận này');
        return;
      }

      const canChi = getCanChi(solar.day, solar.month, solar.year);
      const date = new Date(solar.year, solar.month - 1, solar.day);

      setLunarToSolar({
        ...lunarToSolar,
        result: {
          solar,
          canChi,
          dayName: getDayName(date.getDay())
        }
      });
    } catch (error) {
      alert('Có lỗi xảy ra khi chuyển đổi');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex min-h-screen">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Chuyển Đổi Lịch</h1>
              <p className="text-neutral-600">Chuyển đổi giữa dương lịch và âm lịch một cách chính xác</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Solar to Lunar */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <i className="fas fa-sun mr-2"></i>
                  Dương Lịch → Âm Lịch
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Ngày
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={solarToLunar.day}
                        onChange={(e) => setSolarToLunar({...solarToLunar, day: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Ngày"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Tháng
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={solarToLunar.month}
                        onChange={(e) => setSolarToLunar({...solarToLunar, month: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tháng"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Năm
                      </label>
                      <input
                        type="number"
                        min="1900"
                        max="2100"
                        value={solarToLunar.year}
                        onChange={(e) => setSolarToLunar({...solarToLunar, year: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Năm"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSolarToLunar}
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Chuyển đổi
                  </button>

                  {solarToLunar.result && (
                    <div className="mt-6 p-4 bg-primary bg-opacity-10 rounded-lg">
                      <h3 className="font-semibold text-primary mb-3">Kết Quả Chuyển Đổi</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-neutral-600">
                          {solarToLunar.result.dayName}, {solarToLunar.day}/{solarToLunar.month}/{solarToLunar.year}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-neutral-600">Âm Lịch</p>
                            <p className="text-xl font-bold text-primary">
                              {solarToLunar.result.lunar.day}/{solarToLunar.result.lunar.month}/{solarToLunar.result.lunar.year}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {solarToLunar.result.lunar.isLeapMonth ? 'Tháng nhuận' : 'Tháng đủ'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-600">Can Chi</p>
                            <p className="text-lg font-semibold text-accent">
                              {solarToLunar.result.canChi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Lunar to Solar */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-accent mb-6 flex items-center">
                  <i className="fas fa-moon mr-2"></i>
                  Âm Lịch → Dương Lịch
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Ngày
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={lunarToSolar.day}
                        onChange={(e) => setLunarToSolar({...lunarToSolar, day: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="Ngày"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Tháng
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={lunarToSolar.month}
                        onChange={(e) => setLunarToSolar({...lunarToSolar, month: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="Tháng"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Năm
                      </label>
                      <input
                        type="number"
                        min="1900"
                        max="2100"
                        value={lunarToSolar.year}
                        onChange={(e) => setLunarToSolar({...lunarToSolar, year: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="Năm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isLeapMonth"
                      checked={lunarToSolar.isLeapMonth}
                      onChange={(e) => setLunarToSolar({...lunarToSolar, isLeapMonth: e.target.checked})}
                      className="mr-2 rounded focus:ring-accent"
                    />
                    <label htmlFor="isLeapMonth" className="text-sm text-neutral-700">
                      Tháng nhuận
                    </label>
                  </div>
                  
                  <button
                    onClick={handleLunarToSolar}
                    className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent-dark transition-colors font-medium"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Chuyển đổi
                  </button>

                  {lunarToSolar.result && (
                    <div className="mt-6 p-4 bg-accent bg-opacity-10 rounded-lg">
                      <h3 className="font-semibold text-accent mb-3">Kết Quả Chuyển Đổi</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-neutral-600">
                          Âm lịch {lunarToSolar.day}/{lunarToSolar.month}/{lunarToSolar.year} {lunarToSolar.isLeapMonth ? '(Nhuận)' : ''}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-neutral-600">Dương Lịch</p>
                            <p className="text-xl font-bold text-accent">
                              {lunarToSolar.result.solar.day}/{lunarToSolar.result.solar.month}/{lunarToSolar.result.solar.year}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {lunarToSolar.result.dayName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-600">Can Chi</p>
                            <p className="text-lg font-semibold text-primary">
                              {lunarToSolar.result.canChi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                <i className="fas fa-info-circle mr-2"></i>
                Thông Tin Hữu Ích
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Về Lịch Âm</h3>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Lịch âm dựa trên chu kỳ của mặt trăng</li>
                    <li>• Một tháng âm lịch có 29 hoặc 30 ngày</li>
                    <li>• Năm âm lịch có 12 tháng, khoảng 354 ngày</li>
                    <li>• Có tháng nhuận để điều chỉnh với năm dương lịch</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">Lưu Ý Khi Sử Dụng</h3>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Kết quả chính xác từ năm 1900 đến 2100</li>
                    <li>• Tháng nhuận chỉ áp dụng cho chuyển đổi âm → dương</li>
                    <li>• Ngày âm lịch từ 1-30, dương lịch từ 1-31</li>
                    <li>• Múi giờ tính theo Việt Nam (GMT+7)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
