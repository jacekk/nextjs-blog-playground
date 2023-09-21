import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({ utc: new Date().toUTCString(), iso: new Date().toISOString() });
}
