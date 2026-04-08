import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'member'
    });

    return NextResponse.json({ 
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
