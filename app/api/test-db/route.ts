import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: NextRequest) {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    console.log('Connecting to database...');
    // Test database connection by fetching data from the User table
    const result = await sql`SELECT * FROM "User" LIMIT 1;`;
    console.log('Database connection and query successful:', result);
    return NextResponse.json({ message: 'Database connection and query successful', result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to database:', error.message, error.stack);
    } else {
      console.error('Error connecting to database:', error);
    }
    return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
  }
}