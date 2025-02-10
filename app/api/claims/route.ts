import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  const { userId, chainName, tokensClaimed, tokenPrice, dateClaimed, tokenSymbol, walletAddress, txHash } = await req.json();

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    const result = await sql`
      INSERT INTO claims (user_id, chain_name, tokens_claimed, token_price, date_claimed, token_symbol, wallet_address, tx_hash)
      VALUES (${userId}, ${chainName}, ${tokensClaimed}, ${tokenPrice}, ${dateClaimed}, ${tokenSymbol}, ${walletAddress}, ${txHash})
      RETURNING *;
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    const result = await sql`
      SELECT user_id, chain_name, tokens_claimed, token_price, date_claimed, token_symbol, wallet_address, tx_hash
      FROM claims
      WHERE user_id = ${userId};
    `;
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}