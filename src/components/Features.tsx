'use client';

import Link from 'next/link';

const FEATURES = [
  {
    icon: 'fas fa-exchange-alt',
    title: 'Chuyển Đổi Lịch',
    description: 'Chuyển đổi nhanh chóng giữa dương lịch và âm lịch với độ chính xác cao',
    link: '/converter',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    icon: 'fas fa-hourglass-half',
    title: 'Đếm Ngược Tết',
    description: 'Theo dõi thời gian còn lại đến Tết Nguyên Đán và các ngày lễ quan trọng',
    link: '/countdown',
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600'
  },
  {
    icon: 'fas fa-bell',
    title: 'Nhắc Nhở Sự Kiện',
    description: 'Tạo nhắc nhở cá nhân và nhận thông báo qua email cho các sự kiện quan trọng',
    link: '/reminders',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  {
    icon: 'fas fa-calendar-alt',
    title: 'Lịch Tháng',
    description: 'Xem lịch tháng với đầy đủ thông tin âm dương, ngày lễ và sự kiện',
    link: '/calendar',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    icon: 'fas fa-calendar',
    title: 'Lịch Năm',
    description: 'Tổng quan toàn bộ năm với các ngày lễ tết và sự kiện văn hóa',
    link: '/yearly',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600'
  },
  {
    icon: 'fas fa-clock',
    title: 'Giờ Hoàng Đạo',
    description: 'Xem giờ hoàng đạo hàng ngày để chọn thời điểm tốt lành',
    link: '/',
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600'
  }
];

export function Features() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        <i className="fas fa-star mr-2"></i>
        Tính Năng Nổi Bật
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <Link key={index} href={feature.link}>
            <div className={`${feature.bgColor} rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-neutral-100`}>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mr-4`}>
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <h3 className={`text-lg font-semibold ${feature.textColor}`}>
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <div className={`text-sm font-medium ${feature.textColor} flex items-center`}>
                Khám phá ngay
                <i className="fas fa-arrow-right ml-2"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">
          <i className="fas fa-rocket mr-2"></i>
          Bắt Đầu Sử Dụng Ngay
        </h3>
        <p className="mb-4 opacity-90">
          Khám phá tất cả tính năng của lịch âm dương Việt Nam hoàn toàn miễn phí
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/calendar">
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors">
              <i className="fas fa-calendar mr-2"></i>
              Xem Lịch Tháng
            </button>
          </Link>
          <Link href="/converter">
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
              <i className="fas fa-exchange-alt mr-2"></i>
              Chuyển Đổi Lịch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
