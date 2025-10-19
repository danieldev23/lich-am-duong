import { NextResponse } from 'next/server';
import { startCronJob } from '@/lib/cron';

// This endpoint will be called automatically when the app starts
export async function GET() {
  try {
    // Auto-start cron job when server is ready
    await startCronJob();
    
    return NextResponse.json({
      success: true,
      message: 'Application initialized successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Failed to initialize application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}