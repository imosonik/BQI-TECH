// app/api/admin/statuses/route.ts
import { NextRequest, NextResponse } from 'next/server';

const predefinedStatuses = [
  'New',
  'Interviewing',
  'Application',
  'Disqualified',
  'Hired'
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(predefinedStatuses);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}