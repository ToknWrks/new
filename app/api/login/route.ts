import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    // Find the user in the database
    const users = await sql`
      SELECT * FROM "User" WHERE email = ${email};
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users[0];

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

export async function GET(request: NextRequest) {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    // Test database connection
    const result = await sql`SELECT 1+1 AS result;`;
    return NextResponse.json({ message: 'Database connection successful', result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to database:', error.message, error.stack);
    } else {
      console.error('Error connecting to database:', error);
    }
    return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
  }
}