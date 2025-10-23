import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const affiliateData = await prisma.siteSettings.findFirst({
      where: { key: "affiliate_banner" },
    });

    if (affiliateData) {
      const parsedData = JSON.parse(affiliateData.value);
      return NextResponse.json({
        success: true,
        data: parsedData,
      });
    }

    // Return default data if not found
    return NextResponse.json({
      success: true,
      data: {
        provider: "SHOPEE",
        hotTitle: "FLASH SALE 12.12",
        productImg: "",
        productTitle: "",
        price: 0,
        oldPrice: 0,
        features: [],
        linkToBuy: "",
        isVisible: false,
      },
    });
  } catch (error) {
    console.error("Error fetching affiliate data:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
