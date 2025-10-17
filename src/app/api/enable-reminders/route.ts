import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Check if the setting already exists
    const existingSetting = await prisma.siteSettings.findUnique({
      where: { key: "enable_reminders" }
    });

    if (existingSetting) {
      // Update existing setting
      await prisma.siteSettings.update({
        where: { key: "enable_reminders" },
        data: { value: "true" }
      });
    } else {
      // Create new setting
      await prisma.siteSettings.create({
        data: {
          key: "enable_reminders",
          value: "true",
          description: "Enable reminder functionality"
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Reminders feature has been enabled" 
    });
  } catch (error) {
    console.error("Error enabling reminders:", error);
    return NextResponse.json(
      { error: "Failed to enable reminders" },
      { status: 500 }
    );
  }
}