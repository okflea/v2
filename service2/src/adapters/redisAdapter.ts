
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const setupRedisAdapter = async () => {
  const pubClient = createClient({ url: redisUrl });
  const subClient = pubClient.duplicate();

  pubClient.on('error', (err) => {
    console.error('Redis pubClient error:', err);
  });
  subClient.on('error', (err) => {
    console.error('Redis subClient error:', err);
  });

  await Promise.all([pubClient.connect(), subClient.connect()]);
  console.log('Redis connected');
  return createAdapter(pubClient, subClient);
};
