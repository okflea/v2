import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // load environment variables

const app = express();
const port = process.env.SERVICE2_PORT || 3002;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Service 2!' });
});

app.listen(port, () => {
  console.log(`Service 2 listening on port ${port}`);
});
