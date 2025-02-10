const express = require('express');
const bodyParser = require('body-parser');
const { neon } = require('@neondatabase/serverless');
const session = require('express-session');
const helmet = require('helmet');

const app = express();
const port = 3000;

// Add security middleware
app.use(helmet());

// Parse JSON bodies
app.use(bodyParser.json());

// Configure session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Helper function to validate required fields
const validateRequest = (requiredFields, reqBody) => {
  const missingFields = requiredFields.filter(field => !(field in reqBody));
  if (missingFields.length > 0) {
    return { error: `Missing required fields: ${missingFields.join(', ')}` };
  }
  return null;
};

// POST route for claims
app.post('/api/claims', async (req, res) => {
  const requiredFields = ['userId', 'chainName', 'tokensClaimed', 'tokenPrice', 
    'dateClaimed', 'tokenSymbol', 'walletAddress', 'txHash'];
  
  const validationError = validateRequest(requiredFields, req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const { userId, chainName, tokensClaimed, tokenPrice, dateClaimed, 
      tokenSymbol, walletAddress, txHash } = req.body;

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const sql = neon(databaseUrl);
    const result = await sql`
      INSERT INTO claims 
        (user_id, chain_name, tokens_claimed, token_price, date_claimed, 
         token_symbol, wallet_address, tx_hash)
      VALUES 
        (${userId}, ${chainName}, ${tokensClaimed}, ${tokenPrice}, 
         ${dateClaimed}, ${tokenSymbol}, ${walletAddress}, ${txHash})
      RETURNING *;
    `;

    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for claims
app.get('/api/claims', async (req, res) => {
  const userId = req.query.userId;

  console.log("Received request for userId:", userId); // Debugging log

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    console.log("Connecting to database with URL:", databaseUrl); // Debugging log
    const sql = neon(databaseUrl);
    const result = await sql`
      SELECT * FROM claims WHERE user_id = ${userId};
    `;

    console.log("Fetched claims from database:", result); // Debugging log

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching claims from database:", err); // Debugging log
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route for swaps
app.post('/api/swaps', async (req, res) => {
  const requiredFields = ['claimId', 'tokensSwapped', 'tokensUnswapped', 'txHash'];
  
  const validationError = validateRequest(requiredFields, req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const { claimId, tokensSwapped, tokensUnswapped, txHash } = req.body;

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const sql = neon(databaseUrl);
    const result = await sql`
      INSERT INTO swaps 
        (claim_id, tokens_swapped, tokens_unswapped, tx_hash)
      VALUES 
        (${claimId}, ${tokensSwapped}, ${tokensUnswapped}, ${txHash})
      RETURNING *;
    `;

    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all route for unsupported HTTP methods
app.all('*', (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});