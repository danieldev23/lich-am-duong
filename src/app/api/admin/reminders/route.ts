import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const reminders = await prisma.reminder.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const { title, description, date, time, email } = body || {};
    if (!title || !date || !email) {
      return NextResponse.json(
        { success: false, error: "title, date, email are required" },
        { status: 400 }
      );
    }
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    let timeDate: Date | null = null;
    if (time) {
      const [hh, mm] = String(time)
        .split(":")
        .map((n: string) => parseInt(n, 10));
      timeDate = new Date(dateOnly);
      timeDate.setHours(hh || 0, mm || 0, 0, 0);
    }
    const newReminder = await prisma.reminder.create({
      data: {
        title,
        description: description || null,
        email,
        date: dateOnly,
        time: timeDate,
        status: "PENDING",
      },
    });
    return NextResponse.json({
      success: true,
      data: newReminder,
    });
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const { id, status } = body || {};
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "id and status are required" },
        { status: 400 }
      );
    }
    const updated = await prisma.reminder.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating reminder:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }
    await prisma.reminder.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
