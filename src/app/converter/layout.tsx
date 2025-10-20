import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chuyển Đổi Lịch - Đổi Âm Lịch Dương Lịch | XemLich.me',
    description: 'Công cụ chuyển đổi lịch âm dương chính xác. Đổi từ dương lịch sang âm lịch và ngược lại. Tính can chi, ngày tốt xấu, giờ hoàng đạo hắc đạo.',
    keywords: 'chuyển đổi lịch, đổi lịch âm dương, âm lịch sang dương lịch, dương lịch sang âm lịch, converter lịch, tính can chi, đổi lịch việt nam',
    openGraph: {
        title: 'Chuyển Đổi Lịch - Đổi Âm Lịch Dương Lịch',
        description: 'Công cụ chuyển đổi lịch âm dương chính xác với tính năng tính can chi và ngày tốt xấu.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Chuyển Đổi Lịch - Đổi Âm Lịch Dương Lịch',
        description: 'Công cụ chuyển đổi lịch âm dương chính xác với tính năng tính can chi và ngày tốt xấu.',
        images: ['/xemlich_banner.png'],
    },
};

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}