import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log(`[${new Date().toISOString()}] Manual trigger requested`);
    
    // Call the existing send API
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/reminders/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    console.log(`Manual trigger completed - Status: ${response.status}`);
    
    return NextResponse.json({
      success: true,
      message: "Đã trigger gửi mail thành công",
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error in manual trigger:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Có lỗi xảy ra khi trigger gửi mail",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Allow GET requests for easy testing
export async function GET() {
  return POST(new NextRequest("http://localhost/api/reminders/trigger"));
}