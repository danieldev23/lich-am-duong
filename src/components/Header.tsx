'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSettings } from '@/hooks/useSettings';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useSettings();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // 150ms delay để tránh menu biến mất khi di chuyển chuột
    setHoverTimeout(timeout);
  };

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const navItems = [
    {
      label: 'Xem lịch',
      icon: 'calendar-days',
      dropdown: [
        { href: '/', label: 'Xem lịch ngày', icon: 'calendar-day' },
        { href: '/calendar', label: 'Xem lịch tháng', icon: 'calendar-alt' },
        { href: '/yearly', label: 'Xem lịch năm', icon: 'calendar-check' },
        { href: '/converter', label: 'Đổi lịch âm dương', icon: 'moon' },
      ],
    },
    { label: 'Xem lịch tháng', icon: 'calendar-alt', href: '/calendar' },
    { label: 'Xem lịch năm', icon: 'calendar-check', href: '/yearly' },
    { label: 'Nhắc nhở sự kiện', icon: 'bell', href: '/reminders' },
    {
      label: 'Tiện ích',
      icon: 'toolbox',
      dropdown: [
        { href: '/countdown', label: 'Đếm ngược Tết', icon: 'hourglass-half' },
        { href: '/reminders', label: 'Nhắc nhở sự kiện', icon: 'bell' },
        { href: '/events', label: 'Ngày lễ năm 2025', icon: 'gift' },
      ],
    },
    {
      label: 'Hỗ trợ',
      icon: 'question-circle',
      dropdown: [
        { href: '/terms', label: 'Điều khoản sử dụng', icon: 'file-contract' },
        { href: '/privacy', label: 'Chính sách bảo mật', icon: 'shield-alt' },
        { href: 'https://t.me/rumhtmvt', label: 'Liên hệ', icon: 'envelope' },
      ],
    },
  ];


  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-dark text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end space-x-6 text-sm">
            <Link href="/" className="hover:text-beige-100 transition-colors">
              Lịch âm hôm nay
            </Link>
            <Link href="/yearly" className="hover:text-beige-100 transition-colors">
              Lịch âm 2026
            </Link>
            <Link href="/converter" className="hover:text-beige-100 transition-colors">
              Đổi lịch âm dương
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-primary shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
              <div className="flex flex-col leading-tight">
                <img src="/xemlich_logo.png" alt="" className="w-24 object-cover" />
                {/* <span className="text-xs opacity-90">Lịch Việt cho mọi nhà</span> */}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                item.dropdown ? (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="px-4 py-2 rounded text-sm font-medium text-white/95 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center"
                    >
                      <i className={`fas fa-${item.icon} mr-2`}></i>
                      {item.label}
                      <i className="fas fa-chevron-down ml-1 text-xs"></i>
                    </button>
                    {openDropdown === item.label && (
                      <div
                        className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl py-2 animate-fade-in z-50"
                        style={{ marginTop: '2px' }} // Giảm khoảng cách để dễ hover
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          subItem.href.startsWith('mailto:') ? (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
                            >
                              » {subItem.label}
                            </a>
                          ) : (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
                            >
                              » {subItem.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.href!}
                    className={cn(
                      "px-4 py-2 rounded text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-white/20 text-white"
                        : "text-white/95 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <i className={`fas fa-${item.icon} mr-2`}></i>
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-primary-dark border-t border-primary-light">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="w-full text-left px-4 py-3 rounded text-sm font-medium text-white/95 hover:bg-white/10 transition-colors flex items-center justify-between"
                      >
                        <span>
                          <i className={`fas fa-${item.icon} mr-3`}></i>
                          {item.label}
                        </span>
                        <i className={`fas fa-chevron-${openDropdown === item.label ? 'up' : 'down'} text-xs`}></i>
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-8 space-y-1 mt-1">
                          {item.dropdown.map((subItem, subIndex) => (
                            subItem.href.startsWith('mailto:') ? (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                              >
                                » {subItem.label}
                              </a>
                            ) : (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                              >
                                » {subItem.label}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-white/20 text-white"
                          : "text-white/95 hover:bg-white/10"
                      )}
                    >
                      <i className={`fas fa-${item.icon} mr-3`}></i>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
