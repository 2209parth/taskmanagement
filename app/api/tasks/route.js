import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { getAuthUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { title, description } = await req.json();
    const task = await Task.create({ title, description });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const tasks = await Task.find({}).populate('claimedBy', 'name email').sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
