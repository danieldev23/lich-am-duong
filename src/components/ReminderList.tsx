'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Reminder = {
  id: string;
  title: string;
  description?: string;
  email: string;
  date: string;
  time?: string;
  isRecurring: boolean;
  status: 'PENDING' | 'SENT' | 'FAILED';
  createdAt: string;
};

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
      if (!response.ok) {
        throw new Error('Failed to fetch reminders');
      }

      const data = await response.json();
      if (data.success) {
        setReminders(data.reminders);
      } else {
        console.error('Error fetching reminders:', data.error);
      }
    } catch (error) {
      console.error('Error fetching reminders from API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Không có ngày';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid Date';
    }

    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    if (!dateString) return false;

    const reminderDate = new Date(dateString);
    if (isNaN(reminderDate.getTime())) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return reminderDate >= today;
  };

  const getDaysUntil = (dateString: string) => {
    if (!dateString) return 'Không có ngày';

    const reminderDate = new Date(dateString);
    if (isNaN(reminderDate.getTime())) return 'Invalid Date';

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

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Có lỗi xảy ra khi xóa nhắc nhở');
        return;
      }

      // Remove from local state
      setReminders(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      alert('Không thể kết nối đến server để xóa nhắc nhở');
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

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Có lỗi xảy ra khi cập nhật nhắc nhở');
        return;
      }

      const result = await response.json();

      // Update local state
      setReminders(prev => prev.map(r => r.id === updatedReminder.id ? {
        ...updatedReminder,
        createdAt: r.createdAt // Keep original createdAt
      } : r));

      setEditingReminder(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra khi cập nhật nhắc nhở');
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
        <>
          {/* Scrollable Reminder List */}
          <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={cn(
                  "border-2 rounded-lg p-3 sm:p-4 transition-all hover:shadow-md",
                  isUpcoming(reminder.date)
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-800 mb-1">
                      {reminder.title}
                    </h3>
                    {reminder.description && (
                      <p className="text-xs sm:text-sm text-neutral-600 mb-2">
                        {reminder.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {reminder.isRecurring && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <i className="fas fa-repeat mr-1"></i>
                        <span className="hidden sm:inline">Hàng năm</span>
                        <span className="sm:hidden">Lặp lại</span>
                      </span>
                    )}

                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                      reminder.status === 'SENT' ? "bg-green-100 text-green-800" :
                        reminder.status === 'FAILED' ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                    )}>
                      <i className={cn(
                        "mr-1",
                        reminder.status === 'SENT' ? "fas fa-check" :
                          reminder.status === 'FAILED' ? "fas fa-times" :
                            "fas fa-clock"
                      )}></i>
                      {reminder.status === 'SENT' ? 'Đã gửi' :
                        reminder.status === 'FAILED' ? 'Thất bại' :
                          'Chờ gửi'}
                    </span>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center text-neutral-600">
                    <i className="fas fa-calendar mr-2 text-emerald-600 flex-shrink-0"></i>
                    <span className="truncate">{formatDate(reminder.date)}</span>
                  </div>

                  {reminder.time && (
                    <div className="flex items-center text-neutral-600">
                      <i className="fas fa-clock mr-2 text-emerald-600 flex-shrink-0"></i>
                      <span>{(() => {
                        const timeDate = new Date(reminder.time);
                        if (isNaN(timeDate.getTime())) {
                          return reminder.time;
                        }
                        return timeDate.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit"
                        });
                      })()}</span>
                    </div>
                  )}

                  <div className="flex items-center text-neutral-600">
                    <i className="fas fa-envelope mr-2 text-emerald-600 flex-shrink-0"></i>
                    <span className="truncate">
                      {reminder.email
                        ? reminder.email.replace(/(.{3}).+(@.+)/, '$1***$2')
                        : ''}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 truncate">
                      Tạo lúc: {(() => {
                        const createdDate = new Date(reminder.createdAt);
                        if (isNaN(createdDate.getTime())) {
                          return 'Không xác định';
                        }
                        return createdDate.toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        });
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats - Fixed at bottom */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{reminders.length}</div>
                <div className="text-xs text-blue-600">Tổng nhắc nhở</div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-600">
                  {reminders.filter(r => r.status === 'PENDING').length}
                </div>
                <div className="text-xs text-yellow-600">Chờ gửi</div>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  {reminders.filter(r => r.status === 'SENT').length}
                </div>
                <div className="text-xs text-green-600">Đã gửi</div>
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
        </>
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
                  onChange={(e) => setEditingReminder({ ...editingReminder, title: e.target.value })}
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
                  onChange={(e) => setEditingReminder({ ...editingReminder, description: e.target.value })}
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
                  onChange={(e) => setEditingReminder({ ...editingReminder, email: e.target.value })}
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
                    onChange={(e) => setEditingReminder({ ...editingReminder, date: e.target.value })}
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
                    onChange={(e) => setEditingReminder({ ...editingReminder, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="editIsRecurring"
                  checked={editingReminder.isRecurring}
                  onChange={(e) => setEditingReminder({ ...editingReminder, isRecurring: e.target.checked })}
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