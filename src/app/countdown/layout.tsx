import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đếm Ngược Tết - Còn Bao Nhiêu Ngày Đến Tết | XemLich.me',
    description: 'Đếm ngược thời gian đến Tết Nguyên Đán và các ngày lễ quan trọng. Xem còn bao nhiêu ngày, giờ, phút đến Tết Âm Lịch.',
    keywords: 'đếm ngược tết, countdown tết, còn bao nhiêu ngày đến tết, tết nguyên đán, đếm ngược lễ tết, countdown âm lịch',
    openGraph: {
        title: 'Đếm Ngược Tết - Còn Bao Nhiêu Ngày Đến Tết',
        description: 'Đếm ngược thời gian đến Tết Nguyên Đán và các ngày lễ quan trọng theo âm lịch.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Đếm Ngược Tết - Còn Bao Nhiêu Ngày Đến Tết',
        description: 'Đếm ngược thời gian đến Tết Nguyên Đán và các ngày lễ quan trọng theo âm lịch.',
        images: ['/xemlich_banner.png'],
    },
};

export default function CountdownLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}