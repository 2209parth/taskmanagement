import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({ status: 'open' }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
