import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nhắc Nhở Sự Kiện - Đặt Lịch Nhắc Nhở | XemLich.me',
    description: 'Tạo và quản lý nhắc nhở sự kiện theo lịch âm dương. Đặt lịch nhắc sinh nhật, kỷ niệm, ngày lễ tết và các sự kiện quan trọng.',
    keywords: 'nhắc nhở sự kiện, đặt lịch nhắc, reminder lịch âm, nhắc nhở sinh nhật, nhắc nhở kỷ niệm, lịch nhắc việt nam, event reminder',
    openGraph: {
        title: 'Nhắc Nhở Sự Kiện - Đặt Lịch Nhắc Nhở',
        description: 'Tạo và quản lý nhắc nhở sự kiện theo lịch âm dương với tính năng gửi email tự động.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nhắc Nhở Sự Kiện - Đặt Lịch Nhắc Nhở',
        description: 'Tạo và quản lý nhắc nhở sự kiện theo lịch âm dương với tính năng gửi email tự động.',
        images: ['/xemlich_banner.png'],
    },
};

export default function RemindersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}