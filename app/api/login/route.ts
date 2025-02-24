import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/user';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    console.log('Connecting to database...');
    // Find the user in the database
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User fetched:', user);

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Store user information in local storage
    const userInfo = { id: user.id, name: user.name, email: user.email };
    return NextResponse.json({ message: 'Login successful', user: userInfo }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error logging in:', error.message, error.stack);
    } else {
      console.error('Error logging in:', error);
    }
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}