
// utils/redisClient.ts
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  console.error('Redis Client error:', err);
});

// Connect immediately so that other modules can use the client
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis Client connected');
  } catch (error) {
    console.error('Error connecting to Redis Client:', error);
  }
})();
