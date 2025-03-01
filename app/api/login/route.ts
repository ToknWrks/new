import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/user';

export async function POST(request: NextRequest) {
  let email, password;

  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    console.log('Connecting to database...');
    // Find the user in the database
    const user = await getUserByEmail(email);

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User fetched:', user);

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Store user information in local storage
    const userInfo = { id: user.id, name: user.name, email: user.email };
    console.log('Login successful:', userInfo);
    return NextResponse.json({ message: 'Login successful', user: userInfo }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error logging in:', error.message, error.stack);
    } else {
      console.error('Error logging in:', error);
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}