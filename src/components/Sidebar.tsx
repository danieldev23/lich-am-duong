'use client';

import { useCalendarStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { href: '/', icon: 'fas fa-sun', label: 'Lịch Hôm Nay', id: 'today' },
  { href: '/calendar', icon: 'fas fa-calendar-days', label: 'Lịch Tháng', id: 'calendar' },
  { href: '/yearly', icon: 'fas fa-calendar-alt', label: 'Lịch Năm', id: 'yearly' },
  { href: '/converter', icon: 'fas fa-exchange-alt', label: 'Chuyển Đổi Lịch', id: 'converter' },
  { href: '/events', icon: 'fas fa-star', label: 'Sự Kiện & Lễ', id: 'events' },
  { href: '/countdown', icon: 'fas fa-clock', label: 'Đếm Ngược Tết', id: 'countdown' },
  { href: '/reminders', icon: 'fas fa-bell', label: 'Nhắc Nhở', id: 'reminders' },
];

export function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useCalendarStore();
  const pathname = usePathname();

  const handleLinkClick = () => {
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-16">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary text-white" 
                      : "hover:bg-neutral-100 text-neutral-700"
                  )}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-neutral-200">
            <div className="bg-gradient-to-r from-primary to-primary-light p-4 rounded-lg text-white text-sm">
              <div className="flex items-center space-x-2 mb-2">
                <i className="fas fa-info-circle"></i>
                <span className="font-semibold">Mẹo nhỏ</span>
              </div>
              <p>Click vào ngày để xem chi tiết giờ hoàng đạo và thông tin đầy đủ!</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
