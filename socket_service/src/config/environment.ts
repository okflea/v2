
import * as dotenv from 'dotenv';

// Load environment variables from a .env file if available
dotenv.config();

export const environment = {
  PORT: process.env.PORT || '3002',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
