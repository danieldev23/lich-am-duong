import { NextResponse } from 'next/server';

// Mock settings data - trong thực tế sẽ lấy từ database
const publicSettings = {
  site_title: 'Lịch Việt Nam',
  site_description: 'Website lịch Việt Nam với đầy đủ thông tin âm dương',
  contact_email: 'admin@lichvietnam.com',
  enable_reminders: 'true',
  seo_keywords: 'lịch việt nam, âm lịch, dương lịch, tết nguyên đán, ngày lễ',
  facebook_url: 'https://facebook.com/lichvietnam',
  twitter_url: 'https://twitter.com/lichvietnam',
  instagram_url: 'https://instagram.com/lichvietnam'
};

export async function GET() {
  try {
    // Trong thực tế sẽ lấy từ database:
    // const settings = await prisma.setting.findMany({
    //   where: { isPublic: true }
    // });
    
    return NextResponse.json({
      success: true,
      data: publicSettings
    });
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
