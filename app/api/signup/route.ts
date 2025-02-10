import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    // Create a new user in the database
    const user = await sql`
      INSERT INTO "User" (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email;
    `;

    return NextResponse.json(user[0], { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}