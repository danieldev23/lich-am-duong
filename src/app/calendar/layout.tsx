import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lịch Tháng - Xem Lịch Âm Dương Việt Nam | XemLich.me',
    description: 'Xem lịch tháng âm dương Việt Nam chi tiết. Hiển thị ngày âm lịch, dương lịch, ngày tốt xấu, giờ hoàng đạo, hắc đạo, tiết khí và các sự kiện quan trọng trong tháng.',
    keywords: 'lịch tháng, lịch âm tháng, lịch dương tháng, xem lịch tháng, lịch việt nam tháng, ngày tốt tháng, giờ hoàng đạo tháng, lịch âm dương tháng',
    openGraph: {
        title: 'Lịch Tháng - Xem Lịch Âm Dương Việt Nam',
        description: 'Xem lịch tháng âm dương Việt Nam chi tiết với ngày tốt xấu, giờ hoàng đạo và các sự kiện quan trọng.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Lịch Tháng - Xem Lịch Âm Dương Việt Nam',
        description: 'Xem lịch tháng âm dương Việt Nam chi tiết với ngày tốt xấu, giờ hoàng đạo và các sự kiện quan trọng.',
        images: ['/xemlich_banner.png'],
    },
};

export default function CalendarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}