import { HOLIDAYS } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    // Lấy từ constants trước, sau này có thể thêm database
    // TODO: Kết hợp với database holidays
    // const dbHolidays = await prisma.holiday.findMany();
    let filteredHolidays = [...HOLIDAYS];

    // Filter by month
    if (month) {
      const monthNum = parseInt(month);
      if (monthNum >= 1 && monthNum <= 12) {
        filteredHolidays = filteredHolidays.filter(holiday => {
          const [eventMonth] = holiday.date.split('-').map(Number);
          return eventMonth === monthNum;
        });
      }
    }

    // Add year and convert to proper date format
    const targetYear = year ? parseInt(year) : new Date().getFullYear();
    const holidaysWithDates = filteredHolidays.map(holiday => {
      const [month, day] = holiday.date.split('-').map(Number);
      return {
        ...holiday,
        date: new Date(targetYear, month - 1, day),
        type: 'holiday' as const,
        title: holiday.name,
        description: `Ngày lễ ${holiday.name}`
      };
    });

    // Sort by date
    holidaysWithDates.sort((a, b) => a.date.getTime() - b.date.getTime());

    return NextResponse.json({
      success: true,
      data: holidaysWithDates,
      total: holidaysWithDates.length
    });
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy danh sách ngày lễ' },
      { status: 500 }
    );
  }
}