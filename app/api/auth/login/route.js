import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid middle credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user._id, role: user.role, name: user.name });

    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
