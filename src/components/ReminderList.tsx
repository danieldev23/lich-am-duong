'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Reminder {
  id: string;
  email: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  isRecurring: boolean;
  createdAt: string;
  status: string;
}

export function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa nhắc nhở này?')) return;
    
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/reminders?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReminders(prev => prev.filter(r => r.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Có lỗi xảy ra khi xóa nhắc nhở');
      }
    } catch {
      alert('Không thể kết nối đến server');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder);
  };

  const handleSaveEdit = async (updatedReminder: Reminder) => {
    try {
      const response = await fetch('/api/reminders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatedReminder.id,
          email: updatedReminder.email,
          title: updatedReminder.title,
          description: updatedReminder.description,
          reminderDate: updatedReminder.date,
          reminderTime: updatedReminder.time,
          isRecurring: updatedReminder.isRecurring,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReminders(prev => prev.map(r => r.id === updatedReminder.id ? data.reminder : r));
        setEditingReminder(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Có lỗi xảy ra khi cập nhật nhắc nhở');
      }
    } catch {
      alert('Không thể kết nối đến server');
    }
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
    <div>
      <div className="mb-6">
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
                isUpcoming(reminder.date)
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
                    isUpcoming(reminder.date)
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  )}>
                    {getDaysUntil(reminder.date)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-neutral-600">
                  <i className="fas fa-calendar mr-2 text-emerald-600"></i>
                  <span>{formatDate(reminder.date)}</span>
                </div>
                
                {reminder.time && (
                  <div className="flex items-center text-neutral-600">
                    <i className="fas fa-clock mr-2 text-emerald-600"></i>
                    <span>{new Date(reminder.time).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}</span>
                  </div>
                )}
                
                <div className="flex items-center text-neutral-600">
                  <i className="fas fa-envelope mr-2 text-emerald-600"></i>
                  <span className="truncate">{reminder.email}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Tạo lúc: {new Date(reminder.createdAt).toLocaleString('vi-VN')}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEdit(reminder)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(reminder.id)}
                      disabled={isDeleting === reminder.id}
                      className="text-xs text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                    >
                      <i className={cn(
                        "mr-1",
                        isDeleting === reminder.id ? "fas fa-spinner fa-spin" : "fas fa-trash"
                      )}></i>
                      {isDeleting === reminder.id ? 'Đang xóa...' : 'Xóa'}
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
                {reminders.filter(r => isUpcoming(r.date)).length}
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
                {reminders.filter(r => getDaysUntil(r.date) === 'Hôm nay').length}
              </div>
              <div className="text-xs text-orange-600">Hôm nay</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Chỉnh sửa nhắc nhở</h3>
              <button
                onClick={() => setEditingReminder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingReminder);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={editingReminder.title}
                  onChange={(e) => setEditingReminder({...editingReminder, title: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={editingReminder.description || ''}
                  onChange={(e) => setEditingReminder({...editingReminder, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={editingReminder.email}
                  onChange={(e) => setEditingReminder({...editingReminder, email: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày *
                  </label>
                  <input
                    type="date"
                    value={new Date(editingReminder.date).toISOString().split('T')[0]}
                    onChange={(e) => setEditingReminder({...editingReminder, date: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian
                  </label>
                  <input
                    type="time"
                    value={editingReminder.time ? new Date(editingReminder.time).toTimeString().slice(0, 5) : ''}
                    onChange={(e) => setEditingReminder({...editingReminder, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="editIsRecurring"
                  checked={editingReminder.isRecurring}
                  onChange={(e) => setEditingReminder({...editingReminder, isRecurring: e.target.checked})}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-gray-300 rounded"
                />
                <label htmlFor="editIsRecurring" className="ml-2 block text-sm text-gray-700">
                  Lặp lại hàng năm
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingReminder(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
