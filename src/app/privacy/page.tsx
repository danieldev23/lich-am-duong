'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState<string>('');

    const sections = [
        { id: 'introduction', title: '1. Giới Thiệu' },
        { id: 'information-collected', title: '2. Thông Tin Thu Thập' },
        { id: 'how-we-use', title: '3. Cách Sử Dụng Thông Tin' },
        { id: 'information-sharing', title: '4. Chia Sẻ Thông Tin' },
        { id: 'data-security', title: '5. Bảo Mật Dữ Liệu' },
        { id: 'cookies', title: '6. Cookies và Công Nghệ Theo Dõi' },
        { id: 'user-rights', title: '7. Quyền Của Người Dùng' },
        { id: 'data-retention', title: '8. Lưu Trữ Dữ Liệu' },
        { id: 'children-privacy', title: '9. Quyền Riêng Tư Trẻ Em' },
        { id: 'international-transfers', title: '10. Chuyển Giao Dữ Liệu Quốc Tế' },
        { id: 'policy-changes', title: '11. Thay Đổi Chính Sách' },
        { id: 'contact', title: '12. Thông Tin Liên Hệ' }
    ];

    return (
        <div className="min-h-screen bg-beige">
            <Header />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary via-primary-light to-emerald-600 text-white py-16 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-15">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20-20c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm0 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm-40 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                            <i className="fas fa-shield-alt text-3xl"></i>
                        </div>
                        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            Chính Sách Bảo Mật
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Chính sách bảo vệ thông tin cá nhân và quyền riêng tư của người dùng Lịch Việt Nam
                        </p>
                        <p className="text-sm text-white/70 mt-2">
                            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                </div>
            </div>

            <main className="bg-beige py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Table of Contents */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                                        <i className="fas fa-list text-primary text-sm"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Mục Lục</h3>
                                </div>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className={`block text-sm py-2 px-3 rounded-lg transition-colors ${activeSection === section.id
                                                ? 'bg-primary/10 text-primary font-medium'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            onClick={() => setActiveSection(section.id)}
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-xl shadow-lg p-8">

                                {/* Section 1: Introduction */}
                                <section id="introduction" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Giới Thiệu</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chào mừng bạn đến với Lịch Việt Nam. Chúng tôi cam kết bảo vệ quyền riêng tư
                                            và thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi
                                            thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ.
                                        </p>
                                        <p>
                                            Bằng việc sử dụng website và dịch vụ của chúng tôi, bạn đồng ý với các
                                            thực hành được mô tả trong chính sách này.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 2: Information Collected */}
                                <section id="information-collected" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Thông Tin Thu Thập</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <h3 className="text-lg font-semibold">2.1. Thông Tin Bạn Cung Cấp</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Địa chỉ email:</strong> Khi bạn đăng ký nhận nhắc nhở sự kiện</li>
                                            <li><strong>Tên:</strong> Tùy chọn, để cá nhân hóa thông báo</li>
                                            <li><strong>Thông tin nhắc nhở:</strong> Nội dung, ngày giờ, tần suất lặp lại</li>
                                            <li><strong>Phản hồi:</strong> Khi bạn liên hệ với chúng tôi</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">2.2. Thông Tin Thu Thập Tự Động</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành</li>
                                            <li><strong>Dữ liệu sử dụng:</strong> Trang đã xem, thời gian truy cập, tính năng sử dụng</li>
                                            <li><strong>Cookies:</strong> Để cải thiện trải nghiệm người dùng</li>
                                            <li><strong>Dữ liệu thiết bị:</strong> Loại thiết bị, độ phân giải màn hình</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">2.3. Thông Tin Không Thu Thập</h3>
                                        <p>Chúng tôi KHÔNG thu thập:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Mật khẩu (nếu có tài khoản, mật khẩu được mã hóa)</li>
                                            <li>Thông tin tài chính hoặc thẻ tín dụng</li>
                                            <li>Dữ liệu nhạy cảm về sức khỏe, tôn giáo, chính trị</li>
                                            <li>Thông tin từ thiết bị khác không liên quan</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 3: How We Use Information */}
                                <section id="how-we-use" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cách Sử Dụng Thông Tin</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:</p>

                                        <h3 className="text-lg font-semibold">3.1. Cung Cấp Dịch Vụ</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Gửi email nhắc nhở sự kiện theo yêu cầu</li>
                                            <li>Hiển thị thông tin lịch âm cá nhân hóa</li>
                                            <li>Lưu trữ cài đặt và tùy chọn của bạn</li>
                                            <li>Cung cấp hỗ trợ kỹ thuật</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">3.2. Cải Thiện Dịch Vụ</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Phân tích cách sử dụng để cải thiện tính năng</li>
                                            <li>Khắc phục lỗi và vấn đề kỹ thuật</li>
                                            <li>Phát triển tính năng mới dựa trên nhu cầu người dùng</li>
                                            <li>Tối ưu hóa hiệu suất website</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">3.3. Bảo Mật và Pháp Lý</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Phát hiện và ngăn chặn gian lận, spam</li>
                                            <li>Bảo vệ quyền và tài sản của chúng tôi</li>
                                            <li>Tuân thủ nghĩa vụ pháp lý</li>
                                            <li>Đảm bảo an toàn cho người dùng</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 4: Information Sharing */}
                                <section id="information-sharing" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Chia Sẻ Thông Tin</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chúng tôi cam kết KHÔNG bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn
                                            với bên thứ ba vì mục đích thương mại.
                                        </p>

                                        <h3 className="text-lg font-semibold">4.1. Các Trường Hợp Chia Sẻ</h3>
                                        <p>Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Với sự đồng ý của bạn:</strong> Khi bạn cho phép rõ ràng</li>
                                            <li><strong>Nhà cung cấp dịch vụ:</strong> Email service (Gmail SMTP), hosting provider</li>
                                            <li><strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi cơ quan có thẩm quyền</li>
                                            <li><strong>Bảo vệ quyền lợi:</strong> Để bảo vệ quyền, tài sản hoặc an toàn</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">4.2. Nhà Cung Cấp Dịch Vụ</h3>
                                        <p>Các đối tác chúng tôi làm việc cùng:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Google (Gmail):</strong> Để gửi email nhắc nhở</li>
                                            <li><strong>Vercel/Hosting Provider:</strong> Để lưu trữ website</li>
                                            <li><strong>Database Provider:</strong> Để lưu trữ dữ liệu</li>
                                        </ul>
                                        <p>
                                            Tất cả đối tác này đều cam kết bảo vệ thông tin của bạn theo tiêu chuẩn cao.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 5: Data Security */}
                                <section id="data-security" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Bảo Mật Dữ Liệu</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ
                                            thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát, hoặc lạm dụng.
                                        </p>

                                        <h3 className="text-lg font-semibold">5.1. Biện Pháp Kỹ Thuật</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Mã hóa HTTPS:</strong> Tất cả dữ liệu truyền tải được mã hóa</li>
                                            <li><strong>Mã hóa database:</strong> Thông tin nhạy cảm được mã hóa khi lưu trữ</li>
                                            <li><strong>Xác thực bảo mật:</strong> Hệ thống đăng nhập an toàn</li>
                                            <li><strong>Firewall:</strong> Bảo vệ khỏi các cuộc tấn công mạng</li>
                                            <li><strong>Backup định kỳ:</strong> Sao lưu dữ liệu thường xuyên</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">5.2. Biện Pháp Tổ Chức</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Giới hạn quyền truy cập chỉ cho nhân viên cần thiết</li>
                                            <li>Đào tạo nhân viên về bảo mật thông tin</li>
                                            <li>Kiểm tra bảo mật định kỳ</li>
                                            <li>Quy trình xử lý sự cố bảo mật</li>
                                        </ul>

                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                                            <p className="text-yellow-800">
                                                <strong>Lưu ý:</strong> Mặc dù chúng tôi nỗ lực bảo vệ thông tin của bạn,
                                                không có hệ thống nào hoàn toàn an toàn 100%. Bạn cũng có trách nhiệm
                                                bảo vệ thông tin cá nhân của mình.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 6: Cookies */}
                                <section id="cookies" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies và Công Nghệ Theo Dõi</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <h3 className="text-lg font-semibold">6.1. Cookies Là Gì?</h3>
                                        <p>
                                            Cookies là các file văn bản nhỏ được lưu trữ trên thiết bị của bạn khi
                                            truy cập website. Chúng giúp website "nhớ" thông tin về lần truy cập của bạn.
                                        </p>

                                        <h3 className="text-lg font-semibold mt-6">6.2. Cách Chúng Tôi Sử Dụng Cookies</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Cookies cần thiết:</strong> Để website hoạt động bình thường</li>
                                            <li><strong>Cookies tùy chọn:</strong> Lưu cài đặt và tùy chọn của bạn</li>
                                            <li><strong>Cookies phân tích:</strong> Hiểu cách bạn sử dụng website</li>
                                            <li><strong>Cookies bảo mật:</strong> Bảo vệ khỏi các cuộc tấn công</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">6.3. Quản Lý Cookies</h3>
                                        <p>Bạn có thể:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Chấp nhận hoặc từ chối cookies qua trình duyệt</li>
                                            <li>Xóa cookies đã lưu trữ</li>
                                            <li>Thiết lập cảnh báo khi có cookies mới</li>
                                        </ul>
                                        <p>
                                            Lưu ý: Việc tắt cookies có thể ảnh hưởng đến trải nghiệm sử dụng website.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 7: User Rights */}
                                <section id="user-rights" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Quyền Của Người Dùng</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>

                                        <h3 className="text-lg font-semibold">7.1. Quyền Truy Cập</h3>
                                        <p>Bạn có quyền biết thông tin cá nhân nào của bạn đang được lưu trữ.</p>

                                        <h3 className="text-lg font-semibold">7.2. Quyền Chỉnh Sửa</h3>
                                        <p>Bạn có thể yêu cầu cập nhật hoặc sửa đổi thông tin không chính xác.</p>

                                        <h3 className="text-lg font-semibold">7.3. Quyền Xóa</h3>
                                        <p>Bạn có thể yêu cầu xóa thông tin cá nhân trong một số trường hợp nhất định.</p>

                                        <h3 className="text-lg font-semibold">7.4. Quyền Hạn Chế</h3>
                                        <p>Bạn có thể yêu cầu hạn chế việc xử lý thông tin cá nhân.</p>

                                        <h3 className="text-lg font-semibold">7.5. Quyền Rút Lại Đồng Ý</h3>
                                        <p>Bạn có thể rút lại sự đồng ý cho việc xử lý thông tin bất cứ lúc nào.</p>

                                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                                            <p className="text-blue-800">
                                                <strong>Cách thực hiện quyền:</strong> Liên hệ với chúng tôi qua email
                                                support@lichvietnam.com để thực hiện bất kỳ quyền nào ở trên.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 8: Data Retention */}
                                <section id="data-retention" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Lưu Trữ Dữ Liệu</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chúng tôi chỉ lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết
                                            để thực hiện các mục đích đã nêu trong chính sách này.
                                        </p>

                                        <h3 className="text-lg font-semibold">8.1. Thời Gian Lưu Trữ</h3>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Thông tin nhắc nhở:</strong> Cho đến khi bạn xóa hoặc yêu cầu xóa</li>
                                            <li><strong>Dữ liệu sử dụng:</strong> Tối đa 2 năm</li>
                                            <li><strong>Logs hệ thống:</strong> Tối đa 1 năm</li>
                                            <li><strong>Thông tin liên hệ:</strong> Tối đa 3 năm sau lần liên hệ cuối</li>
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-6">8.2. Xóa Dữ Liệu</h3>
                                        <p>Sau thời gian lưu trữ, dữ liệu sẽ được:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Xóa hoàn toàn khỏi hệ thống</li>
                                            <li>Ẩn danh hóa (không thể nhận dạng cá nhân)</li>
                                            <li>Lưu trữ theo yêu cầu pháp lý (nếu có)</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 9: Children's Privacy */}
                                <section id="children-privacy" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Quyền Riêng Tư Trẻ Em</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Dịch vụ của chúng tôi không nhắm đến trẻ em dưới 13 tuổi. Chúng tôi không
                                            cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi.
                                        </p>
                                        <p>
                                            Nếu bạn là phụ huynh hoặc người giám hộ và biết rằng con em mình đã cung cấp
                                            thông tin cá nhân cho chúng tôi, vui lòng liên hệ để chúng tôi có thể xóa
                                            thông tin đó.
                                        </p>
                                        <p>
                                            Nếu chúng tôi phát hiện đã thu thập thông tin từ trẻ em dưới 13 tuổi mà
                                            không có sự đồng ý của phụ huynh, chúng tôi sẽ xóa thông tin đó ngay lập tức.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 10: International Transfers */}
                                <section id="international-transfers" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Chuyển Giao Dữ Liệu Quốc Tế</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Thông tin của bạn có thể được xử lý và lưu trữ tại các máy chủ ở nước ngoài,
                                            bao gồm Hoa Kỳ và các quốc gia khác nơi các nhà cung cấp dịch vụ của chúng
                                            tôi hoạt động.
                                        </p>
                                        <p>
                                            Chúng tôi đảm bảo rằng việc chuyển giao này tuân thủ các quy định về bảo vệ
                                            dữ liệu và thông tin của bạn được bảo vệ ở mức độ tương đương.
                                        </p>
                                        <p>
                                            Bằng việc sử dụng dịch vụ, bạn đồng ý với việc chuyển giao thông tin này.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 11: Policy Changes */}
                                <section id="policy-changes" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Thay Đổi Chính Sách</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phản ánh
                                            các thay đổi trong thực hành của chúng tôi hoặc vì lý do pháp lý, vận hành
                                            hoặc quy định khác.
                                        </p>
                                        <p>
                                            Khi có thay đổi quan trọng, chúng tôi sẽ:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Cập nhật ngày "Cập nhật lần cuối" ở đầu chính sách</li>
                                            <li>Thông báo trên website</li>
                                            <li>Gửi email thông báo (nếu có thông tin liên hệ)</li>
                                        </ul>
                                        <p>
                                            Chúng tôi khuyến khích bạn xem lại chính sách này định kỳ để cập nhật
                                            những thay đổi mới nhất.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 12: Contact */}
                                <section id="contact" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Thông Tin Liên Hệ</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu nào về chính sách bảo mật này
                                            hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, vui lòng liên hệ:
                                        </p>

                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-3">Thông Tin Liên Hệ</h3>
                                            <div className="space-y-2">
                                                <p><strong>Email:</strong> support@lichvietnam.com</p>
                                                <p><strong>Website:</strong> https://lichvietnam.com</p>
                                                <p><strong>Thời gian phản hồi:</strong> Trong vòng 48 giờ làm việc</p>
                                            </div>
                                        </div>

                                        <p>
                                            Chúng tôi cam kết phản hồi mọi yêu cầu của bạn một cách kịp thời và
                                            chuyên nghiệp.
                                        </p>
                                    </div>
                                </section>

                                {/* Navigation Footer */}
                                <div className="border-t pt-6 mt-8">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <Link
                                            href="/"
                                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            Quay về Trang Chủ
                                        </Link>
                                        <Link
                                            href="/terms"
                                            className="text-primary hover:underline"
                                        >
                                            Xem Điều Khoản Sử Dụng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}