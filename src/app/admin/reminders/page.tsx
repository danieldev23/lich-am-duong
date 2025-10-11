'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string;
  email: string;
  isEmailSent: boolean;
  status: 'PENDING' | 'SENT' | 'CANCELLED';
  user?: {
    name?: string;
    email: string;
  };
  createdAt: string;
}

export default function AdminRemindersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    email: ''
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/admin/login');
      return;
    }

    fetchReminders();
  }, [session, status, router]);

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/admin/reminders');
      const data = await response.json();
      if (data.success) {
        setReminders(data.data);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchReminders();
        setShowModal(false);
        setFormData({ title: '', description: '', date: '', email: '' });
      }
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Chờ gửi';
      case 'SENT': return 'Đã gửi';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SENT': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Quay lại Dashboard
              </button>
              <div className="w-px h-6 bg-neutral-300"></div>
              <h1 className="text-xl font-bold text-primary">Quản Lý Nhắc Nhở</h1>
            </div>
            
            <button
              onClick={() => {
                setFormData({ title: '', description: '', date: '', email: '' });
                setShowModal(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Thêm Nhắc Nhở
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-bell text-blue-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Tổng nhắc nhở</p>
                <p className="text-2xl font-bold text-blue-500">{reminders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-clock text-yellow-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Chờ gửi</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {reminders.filter(r => r.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-check text-green-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Đã gửi</p>
                <p className="text-2xl font-bold text-green-500">
                  {reminders.filter(r => r.status === 'SENT').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-times text-red-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Đã hủy</p>
                <p className="text-2xl font-bold text-red-500">
                  {reminders.filter(r => r.status === 'CANCELLED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reminders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">Tiêu đề</th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">Ngày nhắc</th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">Trạng thái</th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">Tạo lúc</th>
                  <th className="text-left py-4 px-6 font-semibold text-neutral-700">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder) => (
                  <tr key={reminder.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6 font-medium">{reminder.title}</td>
                    <td className="py-4 px-6">{reminder.email}</td>
                    <td className="py-4 px-6">
                      {new Date(reminder.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                        {getStatusLabel(reminder.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600">
                      {new Date(reminder.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600 max-w-xs truncate">
                      {reminder.description || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reminders.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-bell-slash text-4xl text-neutral-300 mb-4"></i>
              <p className="text-neutral-500">Chưa có nhắc nhở nào</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-primary mb-4">
              Thêm Nhắc Nhở Mới
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Ngày nhắc *
                </label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}