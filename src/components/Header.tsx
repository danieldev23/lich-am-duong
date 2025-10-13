'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Xem lịch',
      icon: 'calendar',
      dropdown: [
        { href: '/', label: 'Xem lịch ngày' },
        { href: '/calendar', label: 'Xem lịch tháng' },
        { href: '/yearly', label: 'Xem lịch năm' },
        { href: '/converter', label: 'Đổi lịch âm dương' },
      ]
    },
    {
      label: '12 con giáp',
      icon: 'dragon',
      dropdown: [
        { href: '/tu-vi-hom-nay', label: 'Xem tử vi hôm nay' },
        { href: '/tu-vi-ngay-mai', label: 'Xem tử vi ngày mai' },
      ]
    },
    {
      label: '12 cung hoàng đạo',
      icon: 'star',
      dropdown: [
        { href: '/cung-hoang-dao', label: 'Tử vi hàng ngày' },
      ]
    },
    { label: 'Tướng số', icon: 'eye', href: '/tuong-so' },
    { label: 'Phong thủy', icon: 'yin-yang', href: '/phong-thuy' },
    {
      label: 'Tiện ích',
      icon: 'tools',
      dropdown: [
        { href: '/countdown', label: 'Đếm ngược Tết' },
        { href: '/reminders', label: 'Nhắc nhở sự kiện' },
        { href: '/events', label: 'Ngày lễ năm 2025' },
      ]
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
                <span className="text-2xl font-bold tracking-wide">NGAYDEP.COM</span>
                <span className="text-xs opacity-90">Xem lịch âm - Xem ngày tốt xấu</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                item.dropdown ? (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="px-4 py-2 rounded text-sm font-medium text-white/95 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center"
                    >
                      <i className={`fas fa-${item.icon} mr-2`}></i>
                      {item.label}
                      <i className="fas fa-chevron-down ml-1 text-xs"></i>
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 animate-fade-in">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
                          >
                            » {subItem.label}
                          </Link>
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
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                              » {subItem.label}
                            </Link>
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
