'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
    const [activeSection, setActiveSection] = useState<string>('');

    const sections = [
        { id: 'acceptance', title: '1. Chấp Nhận Điều Khoản' },
        { id: 'description', title: '2. Mô Tả Dịch Vụ' },
        { id: 'user-accounts', title: '3. Tài Khoản Người Dùng' },
        { id: 'acceptable-use', title: '4. Sử Dụng Chấp Nhận Được' },
        { id: 'content', title: '5. Nội Dung và Sở Hữu Trí Tuệ' },
        { id: 'privacy', title: '6. Quyền Riêng Tư' },
        { id: 'disclaimers', title: '7. Từ Chối Trách Nhiệm' },
        { id: 'limitation', title: '8. Giới Hạn Trách Nhiệm' },
        { id: 'termination', title: '9. Chấm Dứt Dịch Vụ' },
        { id: 'changes', title: '10. Thay Đổi Điều Khoản' },
        { id: 'contact', title: '11. Thông Tin Liên Hệ' }
    ];

    return (
        <div className="min-h-screen bg-beige">
            <Header />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary via-primary-light to-blue-600 text-white py-16 overflow-hidden">
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
                            <i className="fas fa-file-contract text-3xl"></i>
                        </div>
                        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            Điều Khoản Sử Dụng
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Điều khoản và điều kiện sử dụng dịch vụ Lịch Việt Nam
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

                                {/* Section 1: Acceptance */}
                                <section id="acceptance" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Chấp Nhận Điều Khoản</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Bằng việc truy cập và sử dụng website Lịch Việt Nam ("Dịch vụ"), bạn đồng ý tuân thủ
                                            và bị ràng buộc bởi các điều khoản và điều kiện sử dụng này ("Điều khoản").
                                        </p>
                                        <p>
                                            Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được
                                            phép sử dụng dịch vụ của chúng tôi.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 2: Service Description */}
                                <section id="description" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Mô Tả Dịch Vụ</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Lịch Việt Nam là một ứng dụng web cung cấp các dịch vụ sau:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Hiển thị lịch âm và dương lịch Việt Nam</li>
                                            <li>Chuyển đổi giữa âm lịch và dương lịch</li>
                                            <li>Thông tin về các ngày lễ, tết, và sự kiện văn hóa Việt Nam</li>
                                            <li>Tính năng nhắc nhở sự kiện qua email</li>
                                            <li>Đếm ngược thời gian đến Tết Nguyên Đán</li>
                                            <li>Thông tin về Can Chi, Tiết Khí, và các yếu tố phong thủy</li>
                                        </ul>
                                        <p>
                                            Chúng tôi có quyền thay đổi, tạm ngừng hoặc ngừng cung cấp bất kỳ phần nào
                                            của dịch vụ mà không cần thông báo trước.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 3: User Accounts */}
                                <section id="user-accounts" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Tài Khoản Người Dùng</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Để sử dụng một số tính năng của dịch vụ (như tạo nhắc nhở), bạn có thể cần
                                            cung cấp thông tin cá nhân như địa chỉ email.
                                        </p>
                                        <p>Bạn có trách nhiệm:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Cung cấp thông tin chính xác và cập nhật</li>
                                            <li>Bảo mật thông tin tài khoản của mình</li>
                                            <li>Thông báo ngay cho chúng tôi nếu phát hiện việc sử dụng trái phép</li>
                                            <li>Chịu trách nhiệm cho tất cả hoạt động dưới tài khoản của bạn</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 4: Acceptable Use */}
                                <section id="acceptable-use" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Sử Dụng Chấp Nhận Được</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>Bạn đồng ý không sử dụng dịch vụ để:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Vi phạm bất kỳ luật pháp hoặc quy định nào</li>
                                            <li>Gửi spam hoặc nội dung không mong muốn</li>
                                            <li>Tấn công, làm gián đoạn hoặc làm hỏng hệ thống</li>
                                            <li>Thu thập thông tin người dùng khác mà không có sự đồng ý</li>
                                            <li>Sử dụng robot, spider hoặc công cụ tự động khác</li>
                                            <li>Tạo tài khoản giả mạo hoặc gây hiểu lầm</li>
                                            <li>Phân phối virus, malware hoặc mã độc hại</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 5: Content and IP */}
                                <section id="content" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Nội Dung và Sở Hữu Trí Tuệ</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Tất cả nội dung trên website, bao gồm nhưng không giới hạn ở văn bản, hình ảnh,
                                            logo, thiết kế, và mã nguồn, đều thuộc sở hữu của chúng tôi hoặc được cấp phép sử dụng.
                                        </p>
                                        <p>
                                            Bạn được cấp quyền sử dụng có giới hạn, không độc quyền, không thể chuyển nhượng
                                            để truy cập và sử dụng dịch vụ cho mục đích cá nhân, phi thương mại.
                                        </p>
                                        <p>
                                            Đối với nội dung bạn tạo ra (như nhắc nhở cá nhân), bạn giữ quyền sở hữu nhưng
                                            cấp cho chúng tôi quyền sử dụng cần thiết để cung cấp dịch vụ.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 6: Privacy */}
                                <section id="privacy" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Quyền Riêng Tư</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Việc thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn được quy định
                                            trong <Link href="/privacy" className="text-blue-600 hover:underline">
                                                Chính Sách Bảo Mật</Link> của chúng tôi.
                                        </p>
                                        <p>
                                            Bằng việc sử dụng dịch vụ, bạn đồng ý với việc thu thập và sử dụng thông tin
                                            theo chính sách bảo mật.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 7: Disclaimers */}
                                <section id="disclaimers" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Từ Chối Trách Nhiệm</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Dịch vụ được cung cấp "như hiện tại" và "như có sẵn" mà không có bất kỳ
                                            bảo đảm nào, dù rõ ràng hay ngụ ý.
                                        </p>
                                        <p>Chúng tôi không bảo đảm rằng:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Dịch vụ sẽ hoạt động liên tục và không có lỗi</li>
                                            <li>Thông tin lịch âm hoàn toàn chính xác 100%</li>
                                            <li>Dịch vụ sẽ đáp ứng mọi yêu cầu của bạn</li>
                                            <li>Các lỗi sẽ được khắc phục kịp thời</li>
                                        </ul>
                                        <p>
                                            Thông tin lịch âm được cung cấp chỉ mang tính chất tham khảo. Đối với các
                                            quyết định quan trọng, bạn nên tham khảo ý kiến chuyên gia.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 8: Limitation of Liability */}
                                <section id="limitation" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Giới Hạn Trách Nhiệm</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Trong phạm vi tối đa được pháp luật cho phép, chúng tôi không chịu trách nhiệm
                                            cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào
                                            phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
                                        </p>
                                        <p>
                                            Điều này bao gồm nhưng không giới hạn ở thiệt hại do mất dữ liệu, mất lợi nhuận,
                                            gián đoạn kinh doanh, hoặc bất kỳ thiệt hại nào khác.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 9: Termination */}
                                <section id="termination" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Chấm Dứt Dịch Vụ</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chúng tôi có quyền chấm dứt hoặc tạm ngừng quyền truy cập của bạn vào dịch vụ
                                            ngay lập tức, mà không cần thông báo trước, nếu bạn vi phạm các điều khoản này.
                                        </p>
                                        <p>
                                            Bạn có thể ngừng sử dụng dịch vụ bất cứ lúc nào. Khi chấm dứt, quyền sử dụng
                                            dịch vụ của bạn sẽ kết thúc ngay lập tức.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 10: Changes */}
                                <section id="changes" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Thay Đổi Điều Khoản</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Chúng tôi có quyền cập nhật hoặc thay đổi các điều khoản này bất cứ lúc nào.
                                            Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
                                        </p>
                                        <p>
                                            Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc
                                            bạn chấp nhận các điều khoản mới.
                                        </p>
                                        <p>
                                            Chúng tôi khuyến khích bạn thường xuyên xem lại trang này để cập nhật
                                            những thay đổi mới nhất.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 11: Contact */}
                                <section id="contact" className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Thông Tin Liên Hệ</h2>
                                    <div className="prose text-gray-700 space-y-4">
                                        <p>
                                            Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi:
                                        </p>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p><strong>Email:</strong> support@lichvietnam.com</p>
                                            <p><strong>Website:</strong> https://lichvietnam.com</p>
                                        </div>
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
                                            href="/privacy"
                                            className="text-primary hover:underline"
                                        >
                                            Xem Chính Sách Bảo Mật
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