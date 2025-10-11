'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Reminder {
  id: string;
  email: string;
  title: string;
  description?: string;
  reminderDate: string;
  reminderTime?: string;
  isRecurring: boolean;
  createdAt: string;
}

export function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/reminders');
      const data = await response.json();
      setReminders(data.reminders || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    const reminderDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return reminderDate >= today;
  };

  const getDaysUntil = (dateString: string) => {
    const reminderDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    reminderDate.setHours(0, 0, 0, 0);
    
    const diffTime = reminderDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    if (diffDays > 0) return `Còn ${diffDays} ngày`;
    return `Đã qua ${Math.abs(diffDays)} ngày`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          <i className="fas fa-list mr-2"></i>
          Danh Sách Nhắc Nhở
        </h2>
        <p className="text-neutral-600">
          Quản lý các nhắc nhở đã tạo
        </p>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-bell-slash text-4xl text-neutral-300 mb-4"></i>
          <h3 className="text-lg font-medium text-neutral-600 mb-2">
            Chưa có nhắc nhở nào
          </h3>
          <p className="text-neutral-500">
            Tạo nhắc nhở đầu tiên của bạn ở phía trên
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={cn(
                "border-2 rounded-lg p-4 transition-all hover:shadow-md",
                isUpcoming(reminder.reminderDate)
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                    {reminder.title}
                  </h3>
                  {reminder.description && (
                    <p className="text-sm text-neutral-600 mb-2">
                      {reminder.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {reminder.isRecurring && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <i className="fas fa-repeat mr-1"></i>
                      Hàng năm
                    </span>
                  )}
                  
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    isUpcoming(reminder.reminderDate)
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  )}>
                    {getDaysUntil(reminder.reminderDate)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-neutral-600">
                  <i className="fas fa-calendar mr-2 text-primary"></i>
                  <span>{formatDate(reminder.reminderDate)}</span>
                </div>
                
                {reminder.reminderTime && (
                  <div className="flex items-center text-neutral-600">
                    <i className="fas fa-clock mr-2 text-primary"></i>
                    <span>{reminder.reminderTime}</span>
                  </div>
                )}
                
                <div className="flex items-center text-neutral-600">
                  <i className="fas fa-envelope mr-2 text-primary"></i>
                  <span className="truncate">{reminder.email}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Tạo lúc: {new Date(reminder.createdAt).toLocaleString('vi-VN')}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-xs text-primary hover:text-primary-dark transition-colors">
                      <i className="fas fa-edit mr-1"></i>
                      Sửa
                    </button>
                    <button className="text-xs text-red-600 hover:text-red-700 transition-colors">
                      <i className="fas fa-trash mr-1"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {reminders.length > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{reminders.length}</div>
              <div className="text-xs text-blue-600">Tổng nhắc nhở</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">
                {reminders.filter(r => isUpcoming(r.reminderDate)).length}
              </div>
              <div className="text-xs text-green-600">Sắp tới</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">
                {reminders.filter(r => r.isRecurring).length}
              </div>
              <div className="text-xs text-purple-600">Lặp lại</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">
                {reminders.filter(r => getDaysUntil(r.reminderDate) === 'Hôm nay').length}
              </div>
              <div className="text-xs text-orange-600">Hôm nay</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
