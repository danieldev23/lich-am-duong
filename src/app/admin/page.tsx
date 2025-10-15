'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EVENTS, HOLIDAYS } from '@/lib/constants';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalEvents: 0,
    holidays: 0,
    history: 0,
    culture: 0,
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/admin/login');
      return;
    }

    // Calculate stats
    setStats({
      totalEvents: EVENTS.length,
      holidays: EVENTS.filter(e => e.type === 'holiday').length,
      history: EVENTS.filter(e => e.type === 'history').length,
      culture: EVENTS.filter(e => e.type === 'culture').length,
    });
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <i className="fas fa-cog text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-700">Bảng Điều Khiển Admin</h1>
                <p className="text-sm text-neutral-600">Quản lý hệ thống lịch âm dương</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-600">
                Xin chào, {session.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-alt text-primary text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Tổng sự kiện</p>
                <p className="text-2xl font-bold text-emerald-700">{stats.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-star text-red-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Ngày lễ</p>
                <p className="text-2xl font-bold text-red-500">{stats.holidays}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-landmark text-blue-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Lịch sử</p>
                <p className="text-2xl font-bold text-blue-500">{stats.history}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-heart text-pink-500 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-600">Văn hóa</p>
                <p className="text-2xl font-bold text-pink-500">{stats.culture}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">
              <i className="fas fa-tasks mr-2"></i>
              Thao Tác Nhanh
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/admin/events')}
                className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-200"
              >
                <div className="flex items-center">
                  <i className="fas fa-calendar-alt text-green-500 mr-3"></i>
                  <div>
                    <p className="font-medium">Quản lý sự kiện</p>
                    <p className="text-sm text-neutral-600">Thêm, sửa, xóa sự kiện và ngày lễ</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => router.push('/admin/reminders')}
                className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-200"
              >
                <div className="flex items-center">
                  <i className="fas fa-bell text-blue-500 mr-3"></i>
                  <div>
                    <p className="font-medium">Quản lý nhắc nhở</p>
                    <p className="text-sm text-neutral-600">Xem và tạo nhắc nhở cho người dùng</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => router.push('/admin/settings')}
                className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-200"
              >
                <div className="flex items-center">
                  <i className="fas fa-cog text-accent mr-3"></i>
                  <div>
                    <p className="font-medium">Cài đặt hệ thống</p>
                    <p className="text-sm text-neutral-600">Cấu hình chung của ứng dụng</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">
              <i className="fas fa-chart-line mr-2"></i>
              Thống Kê Hệ Thống
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Sự kiện tháng này</span>
                <span className="font-semibold">
                  {EVENTS.filter(e => {
                    const [month] = e.date.split('-').map(Number);
                    return month === new Date().getMonth() + 1;
                  }).length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Ngày lễ quan trọng</span>
                <span className="font-semibold">{HOLIDAYS.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Trạng thái hệ thống</span>
                <span className="text-green-500 font-semibold">
                  <i className="fas fa-check-circle mr-1"></i>
                  Hoạt động tốt
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            <i className="fas fa-clock mr-2"></i>
            Sự Kiện Gần Đây
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Ngày</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Tên sự kiện</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Loại</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.slice(0, 5).map((event, index) => (
                  <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-sm">{event.date}</td>
                    <td className="py-3 px-4 font-medium">{event.title}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'holiday' ? 'bg-red-100 text-red-800' :
                        event.type === 'history' ? 'bg-blue-100 text-blue-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {event.type === 'holiday' ? 'Ngày lễ' :
                         event.type === 'history' ? 'Lịch sử' : 'Văn hóa'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-600">{event.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Quay về trang chủ
          </button>
        </div>
      </main>
    </div>
  );
}
