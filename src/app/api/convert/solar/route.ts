import { convertLunar2Solar, getCanChi, getDayName } from '@/lib/lunar-calendar';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { day, month, year, isLeapMonth } = await request.json();

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
    const isLeap = Boolean(isLeapMonth);

    if (dayNum < 1 || dayNum > 30 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2100) {
      return NextResponse.json(
        { error: 'Ngày tháng năm không hợp lệ' },
        { status: 400 }
      );
    }

    // Convert to solar
    const solar = convertLunar2Solar(dayNum, monthNum, yearNum, isLeap);

    if (solar.day === 0) {
      return NextResponse.json(
        { error: 'Ngày âm lịch không hợp lệ hoặc không tồn tại tháng nhuận này' },
        { status: 400 }
      );
    }

    const canChi = getCanChi(solar.day, solar.month, solar.year);
    const date = new Date(solar.year, solar.month - 1, solar.day);
    const dayName = getDayName(date.getDay());

    return NextResponse.json({
      success: true,
      data: {
        lunar: {
          day: dayNum,
          month: monthNum,
          year: yearNum,
          isLeapMonth: isLeap
        },
        solar: {
          day: solar.day,
          month: solar.month,
          year: solar.year,
          dayName
        },
        canChi
      }
    });
  } catch (error) {
    console.error('Error converting to solar:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi chuyển đổi' },
      { status: 500 }
    );
  }
}
