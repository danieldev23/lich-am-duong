import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface ISetting {
  id: string;
  key: string;
  value: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany();
    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching public settings:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
