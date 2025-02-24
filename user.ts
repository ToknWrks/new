import { PrismaClient } from '@prisma/client';
import { neon } from '@neondatabase/serverless';

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}
const sql = neon(databaseUrl);

export async function getUserByEmail(email: string) {
  try {
    const users = await sql`
      SELECT * FROM "User" WHERE email = ${email};
    `;
    return users[0];
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export async function createUser(email: string, name: string, password: string) {
  try {
    const user = await sql`
      INSERT INTO "User" (email, name, password)
      VALUES (${email}, ${name}, ${password})
      RETURNING *;
    `;
    return user[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { email, name, password } = req.body;
    const user = await prisma.user.create({
      data: { email, name, password },
    });
    res.status(201).json(user);
  } else {
    res.status(405).end();
  }
}