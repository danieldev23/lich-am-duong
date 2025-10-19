import { NextResponse } from "next/server";
import { triggerCronJob } from "@/lib/cron";

export async function POST() {
  try {
    console.log('🔥 Manual cron trigger requested via API');
    
    await triggerCronJob();
    
    return NextResponse.json({
      success: true,
      message: "Cron job triggered successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error triggering cron job:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to trigger cron job",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Allow GET for easy testing
export async function GET() {
  return POST();
}