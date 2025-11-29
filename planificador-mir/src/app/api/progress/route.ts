import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const progress = await prisma.sessionProgress.findMany({
      orderBy: { sessionNumber: 'asc' },
    });
    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Error fetching progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionNumber, vuelta, completed } = body;

    const progress = await prisma.sessionProgress.upsert({
      where: { sessionNumber },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        sessionNumber,
        vuelta,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Error updating progress' },
      { status: 500 }
    );
  }
}
