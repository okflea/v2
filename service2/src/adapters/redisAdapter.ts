// adapters/redisAdapter.ts
import { createAdapter } from '@socket.io/redis-adapter';
import { redisClient } from '../utils/redisClient';

export const setupRedisAdapter = async () => {
  // For pub/sub, create duplicates of the shared client
  const pubClient = redisClient.duplicate();
  const subClient = redisClient.duplicate();

  pubClient.on('error', (err) => {
    console.error('Redis pubClient error:', err);
  });
  subClient.on('error', (err) => {
    console.error('Redis subClient error:', err);
  });

  await Promise.all([pubClient.connect(), subClient.connect()]);
  console.log('Redis connected for Socket.IO adapter');
  return createAdapter(pubClient, subClient);
};
