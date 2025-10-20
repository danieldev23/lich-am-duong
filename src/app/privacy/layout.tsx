import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chính Sách Bảo Mật - XemLich.me',
    description: 'Chính sách bảo mật thông tin cá nhân và dữ liệu người dùng của XemLich.me. Cam kết bảo vệ quyền riêng tư của bạn.',
    keywords: 'chính sách bảo mật, privacy policy, bảo vệ thông tin, quyền riêng tư, bảo mật dữ liệu xemlich',
    robots: 'index, follow',
    openGraph: {
        title: 'Chính Sách Bảo Mật - XemLich.me',
        description: 'Chính sách bảo mật thông tin cá nhân và dữ liệu người dùng của XemLich.me.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Chính Sách Bảo Mật - XemLich.me',
        description: 'Chính sách bảo mật thông tin cá nhân và dữ liệu người dùng của XemLich.me.',
        images: ['/xemlich_banner.png'],
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}