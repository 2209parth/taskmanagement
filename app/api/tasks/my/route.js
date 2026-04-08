import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { getAuthUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const tasks = await Task.find({ claimedBy: user.id }).sort({ updatedAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
