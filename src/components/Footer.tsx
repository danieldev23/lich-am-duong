'use client';

import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">Lịch Việt Nam</h3>
                        <p className="text-gray-300 mb-4">
                            Ứng dụng lịch âm Việt Nam toàn diện, cung cấp thông tin chính xác về
                            lịch âm dương, ngày lễ tết, và các sự kiện văn hóa truyền thống Việt Nam.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="/calendar" className="text-gray-300 hover:text-white transition-colors">
                                    Lịch Tháng
                                </Link>
                            </li>
                            <li>
                                <Link href="/yearly" className="text-gray-300 hover:text-white transition-colors">
                                    Lịch Năm
                                </Link>
                            </li>
                            <li>
                                <Link href="/converter" className="text-gray-300 hover:text-white transition-colors">
                                    Chuyển Đổi Lịch
                                </Link>
                            </li>
                            <li>
                                <Link href="/reminders" className="text-gray-300 hover:text-white transition-colors">
                                    Nhắc Nhở
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hỗ Trợ</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:support@lichvietnam.com" className="text-gray-300 hover:text-white transition-colors">
                                    Liên Hệ
                                </a>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                                    Điều Khoản Sử Dụng
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                                    Chính Sách Bảo Mật
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm">
                            © {currentYear} Lịch Việt Nam. Tất cả quyền được bảo lưu.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/terms"
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Điều Khoản
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Bảo Mật
                            </Link>
                            <a
                                href="mailto:support@lichvietnam.com"
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Liên Hệ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}