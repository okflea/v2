import express from 'express';
import dotenv from 'dotenv';
import connectDB from './adapters/mongooseAdapter';
import { dbOpsWorker } from './adapters/workerAdapter';

// Load environment variables from local file (optional in production)
dotenv.config();

const app = express();
const port = process.env.SERVICE1_PORT || 3001;

app.get('/', (req, res) => {
  console.log("get /");
  
  res.json({ message: 'Hello from Service 1!' });
});

const startServer = async () => {
  try {
    await connectDB();
    dbOpsWorker.run();
    app.listen(port, () => {
      console.log(`Service 1 listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start worker', err);
  }
};

startServer()
