import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lịch Năm - Xem Lịch Âm Dương Cả Năm | XemLich.me',
    description: 'Xem lịch năm âm dương Việt Nam đầy đủ 12 tháng. Tra cứu ngày tốt xấu, lễ tết, tiết khí, can chi và các sự kiện quan trọng trong năm.',
    keywords: 'lịch năm, lịch âm năm, lịch dương năm, xem lịch năm, lịch việt nam năm, ngày tốt năm, lễ tết năm, tiết khí năm, can chi năm',
    openGraph: {
        title: 'Lịch Năm - Xem Lịch Âm Dương Cả Năm',
        description: 'Xem lịch năm âm dương Việt Nam đầy đủ với ngày tốt xấu, lễ tết và các sự kiện quan trọng.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Lịch Năm - Xem Lịch Âm Dương Cả Năm',
        description: 'Xem lịch năm âm dương Việt Nam đầy đủ với ngày tốt xấu, lễ tết và các sự kiện quan trọng.',
        images: ['/xemlich_banner.png'],
    },
};

export default function YearlyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}