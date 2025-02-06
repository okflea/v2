// routes.ts (or your specific route file)
import Router from 'koa-router';
import { dbOpsQueue } from '../adapters/queueAdapter';
import { DBMessage } from '../types/dbOps';
import { getNextRequestId } from '../utils/requestIdGenerator';

const router = new Router();

router.get('/', async (ctx) => {
  console.log("GET / request received");

  // Generate a dynamic, incrementing request ID
  const requestId = await getNextRequestId();

  const message: DBMessage = {
    operation: "GET",
    collection: "User",
    data: { username: "admin" },
    options: { fields: [] },
    requestId, // dynamic requestId
    timestamp: Date.now(),
  };

  // Assuming dbOpsQueue is defined elsewhere
  const job = await dbOpsQueue.add('dbOps', message);

  ctx.body = 'Hello from Service 2 (Koa + Socket.IO)';
});

export default router;
