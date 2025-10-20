import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Điều Khoản Sử Dụng - XemLich.me',
    description: 'Điều khoản và điều kiện sử dụng dịch vụ lịch âm dương XemLich.me. Quy định về quyền và nghĩa vụ của người dùng.',
    keywords: 'điều khoản sử dụng, terms of service, quy định sử dụng, điều kiện sử dụng xemlich',
    robots: 'index, follow',
    openGraph: {
        title: 'Điều Khoản Sử Dụng - XemLich.me',
        description: 'Điều khoản và điều kiện sử dụng dịch vụ lịch âm dương XemLich.me.',
        images: ['/xemlich_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Điều Khoản Sử Dụng - XemLich.me',
        description: 'Điều khoản và điều kiện sử dụng dịch vụ lịch âm dương XemLich.me.',
        images: ['/xemlich_banner.png'],
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}