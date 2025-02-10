import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  const { claimId, tokensSwapped, tokensUnswapped, txHash } = await req.json();

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    const result = await sql`
      INSERT INTO swaps (claim_id, tokens_swapped, tokens_unswapped, tx_hash)
      VALUES (${claimId}, ${tokensSwapped}, ${tokensUnswapped}, ${txHash})
      RETURNING *;
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}