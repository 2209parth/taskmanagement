import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { getAuthUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { taskId } = await req.json();

    const task = await Task.findOneAndUpdate(
      { _id: taskId, claimedBy: user.id, status: 'claimed' },
      { $set: { status: 'done' } },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ 
        error: 'Task not found or not claimed by you' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Task marked as done', 
      task 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
