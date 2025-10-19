import { NextRequest, NextResponse } from 'next/server';
import { startCronJob, getCronStatus } from '@/lib/cron';

export async function POST(request: NextRequest) {
  try {
    // Check if custom interval is provided
    const body = await request.json().catch(() => ({}));
    const intervalSeconds = body.intervalSeconds || 30; // Default to 30 seconds
    
    await startCronJob(intervalSeconds);
    const status = getCronStatus();
    
    return NextResponse.json({
      success: true,
      message: `Real-time cron job started successfully (${intervalSeconds}s intervals, smart scheduling enabled)`,
      intervalSeconds,
      status,
    });
  } catch (error: any) {
    console.error('Failed to start cron job:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const status = getCronStatus();
  
  return NextResponse.json({
    success: true,
    status,
  });
}