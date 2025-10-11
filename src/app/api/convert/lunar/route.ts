import { convertSolar2Lunar, getCanChi, getDayName } from '@/lib/lunar-calendar';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { day, month, year } = await request.json();

    // Validate input
    if (!day || !month || !year) {
      return NextResponse.json(
        { error: 'Vui lòng nhập đầy đủ ngày, tháng, năm' },
        { status: 400 }
      );
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2100) {
      return NextResponse.json(
        { error: 'Ngày tháng năm không hợp lệ' },
        { status: 400 }
      );
    }

    // Convert to lunar
    const lunar = convertSolar2Lunar(dayNum, monthNum, yearNum);
    const canChi = getCanChi(dayNum, monthNum, yearNum);
    const date = new Date(yearNum, monthNum - 1, dayNum);
    const dayName = getDayName(date.getDay());

    return NextResponse.json({
      success: true,
      data: {
        solar: {
          day: dayNum,
          month: monthNum,
          year: yearNum,
          dayName
        },
        lunar: {
          day: lunar.day,
          month: lunar.month,
          year: lunar.year,
          isLeapMonth: lunar.isLeapMonth
        },
        canChi
      }
    });
  } catch (error) {
    console.error('Error converting to lunar:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi chuyển đổi' },
      { status: 500 }
    );
  }
}
