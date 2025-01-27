import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from local file (optional in production)
dotenv.config();

const app = express();
const port = process.env.SERVICE1_PORT || 3001;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Service 1!' });
});

app.listen(port, () => {
  console.log(`Service 1 listening on port ${port}`);
});
