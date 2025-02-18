// utils/requestIdGenerator.ts
import { redisClient } from './redisClient';

const REQUEST_ID_KEY = 'global:requestIdCounter';

/**
 * Generates a unique, incrementing request ID.
 * @returns A string formatted as 'req-0001', 'req-0002', etc.
 */
export async function getNextRequestId(): Promise<string> {
  // INCR is atomic, ensuring uniqueness even across multiple service instances.
  const counter = await redisClient.incr(REQUEST_ID_KEY);
  return `req-${String(counter).padStart(4, '0')}`;
}
