import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ngày Lễ Năm 2025 - Lịch Nghỉ Lễ Tết Việt Nam | XemLich.me',
    description: 'Danh sách đầy đủ ngày lễ, ngày nghỉ, ngày tết năm 2025 theo lịch âm dương. Bao gồm Tết Nguyên Đán, Giỗ Tổ Hùng Vương, 30/4, 1/5, 2/9.',
    keywords: 'ngày lễ 2025, lịch nghỉ 2025, tết 2025, ngày nghỉ việt nam, lễ tết 2025, ngày lễ âm lịch, holiday vietnam 2025',
    openGraph: {
        title: 'Ngày Lễ Năm 2025 - Lịch Nghỉ Lễ Tết Việt Nam',
        description: 'Danh sách đầy đủ ngày lễ, ngày nghỉ, ngày tết năm 2025 theo lịch âm dương Việt Nam.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ngày Lễ Năm 2025 - Lịch Nghỉ Lễ Tết Việt Nam',
        description: 'Danh sách đầy đủ ngày lễ, ngày nghỉ, ngày tết năm 2025 theo lịch âm dương Việt Nam.',
        images: ['/xemlich_banner.png'],
    },
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}