'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ReminderForm } from '@/components/ReminderForm';
import { ReminderList } from '@/components/ReminderList';

export default function RemindersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReminderCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-beige">
      <Header />
      
      <main className="w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-emerald-700 mb-2">
                🔔 Nhắc Nhở
              </h1>
              <p className="text-gray-600">
                Tạo và quản lý các nhắc nhở, nhận thông báo qua email
              </p>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 text-center">
                <i className="fas fa-envelope text-2xl mb-2"></i>
                <h3 className="font-semibold">Email Tự Động</h3>
                <p className="text-xs opacity-90">Gửi nhắc nhở qua email</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center">
                <i className="fas fa-repeat text-2xl mb-2"></i>
                <h3 className="font-semibold">Lặp Lại Hàng Năm</h3>
                <p className="text-xs opacity-90">Nhắc nhở sinh nhật, kỷ niệm</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 text-center">
                <i className="fas fa-clock text-2xl mb-2"></i>
                <h3 className="font-semibold">Đặt Thời Gian</h3>
                <p className="text-xs opacity-90">Chọn giờ cụ thể</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 text-center">
                <i className="fas fa-calendar-check text-2xl mb-2"></i>
                <h3 className="font-semibold">Quản Lý Dễ Dàng</h3>
                <p className="text-xs opacity-90">Xem, sửa, xóa nhắc nhở</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form tạo nhắc nhở */}
              <div>
                <ReminderForm onSuccess={handleReminderCreated} />
              </div>

              {/* Danh sách nhắc nhở */}
              <div>
                <ReminderList key={refreshKey} />
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-teal-800 mb-4">
                <i className="fas fa-lightbulb mr-2"></i>
                Hướng Dẫn Sử Dụng
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-teal-700 mb-2">📧 Cấu hình Email</h4>
                  <ul className="text-sm text-teal-600 space-y-1">
                    <li>• Cần cấu hình EMAIL_USER và EMAIL_PASS trong .env</li>
                    <li>• Sử dụng Gmail App Password để bảo mật</li>
                    <li>• Kiểm tra hộp thư spam nếu không nhận được email</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-700 mb-2">⚡ Tính Năng</h4>
                  <ul className="text-sm text-teal-600 space-y-1">
                    <li>• Nhắc nhở ngay lập tức qua email</li>
                    <li>• Lặp lại hàng năm cho sinh nhật, kỷ niệm</li>
                    <li>• Đặt thời gian cụ thể trong ngày</li>
                    <li>• Quản lý danh sách nhắc nhở đã tạo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}
