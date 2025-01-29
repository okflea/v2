
import { Queue } from 'bullmq';

// const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';


const dbOpsQueue = new Queue('dbOps', {
  connection: {
    port: 6379,
    host: 'redis',
  }
});

export { dbOpsQueue };

/*
 *
{
  "operation": "GET" | "CREATE" | "UPDATE" | "DELETE",  // The type of DB operation
  "collection": "users" | "orders" | "products" | ... ,  // Which MongoDB collection
  "data": {},                                           // Payload data for CREATE/UPDATE, or query filter for GET/DELETE
  "options": {},                                        // Additional options (fields to project, limits, sorting, etc.)
  "requestId": "unique-correlation-identifier",         // For tracking / logging correlation
  "timestamp": 1695221431                               // (Optional) For debugging, etc.
}
examples: 

{
  "operation": "GET",
  "collection": "users",
  "data": { "_id": "abc123" },
  "options": { "fields": ["name", "email"] },
  "requestId": "req-0001",
  "timestamp": 1695221431
}

{
  "operation": "CREATE",
  "collection": "users",
  "data": {
    "name": "Alice",
    "email": "alice@example.com"
  },
  "options": {},
  "requestId": "req-0002"
}

{
  "operation": "UPDATE",
  "collection": "users",
  "data": {
    "filter": { "_id": "abc123" },
    "update": { "email": "alice.new@example.com" }
  },
  "options": { "multi": false }, 
  "requestId": "req-0003"
}

{
  "operation": "DELETE",
  "collection": "users",
  "data": { "_id": "abc123" },
  "options": {},
  "requestId": "req-0004"
}
 * */
