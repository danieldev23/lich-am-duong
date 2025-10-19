import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Gọi API gửi reminder
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/reminders/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Cron job test completed",
      result
    });
  } catch (error) {
    console.error("Error testing cron job:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi test cron job" },
      { status: 500 }
    );
  }
}