import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}
const sql = neon(databaseUrl);

export async function getUserByEmail(email: string) {
  try {
    console.log('Fetching user by email:', email);
    const users = await sql`
      SELECT * FROM "User" WHERE email = ${email};
    `;
    console.log('User fetched:', users);
    return users[0];
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export async function createUser(email: string, name: string, password: string) {
  try {
    console.log('Creating user:', { email, name, password });
    const user = await sql`
      INSERT INTO "User" (email, name, password)
      VALUES (${email}, ${name}, ${password})
      RETURNING *;
    `;
    console.log('User created:', user);
    return user[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}