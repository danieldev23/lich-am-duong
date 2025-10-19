import { NextResponse } from 'next/server';
import { stopCronJob, getCronStatus } from '@/lib/cron';

export async function POST() {
  try {
    stopCronJob();
    const status = getCronStatus();
    
    return NextResponse.json({
      success: true,
      message: 'Cron job stopped successfully',
      status,
    });
  } catch (error: any) {
    console.error('Failed to stop cron job:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}