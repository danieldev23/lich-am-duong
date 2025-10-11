import { EVENTS } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const month = searchParams.get('month');
    const search = searchParams.get('search');

    // Lấy từ constants trước, sau này có thể thêm database
    // TODO: Kết hợp với database events
    // const dbEvents = await prisma.event.findMany();
    let filteredEvents = [...EVENTS];

    // Filter by type
    if (type && type !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }

    // Filter by month
    if (month) {
      const monthNum = parseInt(month);
      if (monthNum >= 1 && monthNum <= 12) {
        filteredEvents = filteredEvents.filter(event => {
          const [eventMonth] = event.date.split('-').map(Number);
          return eventMonth === monthNum;
        });
      }
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.desc.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by date
    filteredEvents.sort((a, b) => {
      const [monthA, dayA] = a.date.split('-').map(Number);
      const [monthB, dayB] = b.date.split('-').map(Number);
      return monthA - monthB || dayA - dayB;
    });

    return NextResponse.json({
      success: true,
      data: filteredEvents,
      total: filteredEvents.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy danh sách sự kiện' },
      { status: 500 }
    );
  }
}
