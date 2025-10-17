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

    const affiliateData = await prisma.siteSettings.findFirst({
      where: { key: "affiliate_banner" },
    });

    if (affiliateData) {
      const parsedData = JSON.parse(affiliateData.value);
      console.log("Retrieved affiliate data:", JSON.stringify(parsedData, null, 2));
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
    console.log("Received affiliate data:", JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.provider || !body.productTitle) {
      return NextResponse.json(
        { success: false, error: "Provider and product title are required" },
        { status: 400 }
      );
    }

    // Save or update affiliate data
    await prisma.siteSettings.upsert({
      where: { key: "affiliate_banner" },
      update: { value: JSON.stringify(body) },
      create: {
        key: "affiliate_banner",
        value: JSON.stringify(body),
        description: "Affiliate banner configuration",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Affiliate banner updated successfully",
    });
  } catch (error) {
    console.error("Error saving affiliate data:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}