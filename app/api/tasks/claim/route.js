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

    /**
     * CRITICAL ATOMIC LOGIC:
     * We use findOneAndUpdate with status: 'open' in the filter.
     * This ensures that only the first request to hit the DB for this taskId
     * and status will succeed in updating it to 'claimed'.
     */
    const task = await Task.findOneAndUpdate(
      { _id: taskId, status: 'open' },
      { 
        $set: { 
          status: 'claimed', 
          claimedBy: user.id 
        } 
      },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ 
        error: 'Task already claimed or does not exist' 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      message: 'Task claimed successfully', 
      task 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
