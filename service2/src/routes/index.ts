
import Router from 'koa-router';
import { dbOpsQueue } from '../adapters/queueAdapter';
import { DBMessage } from '../types/dbOps';

const router = new Router();

router.get('/', async (ctx) => {

  console.log("get /");
  //FIX: remove later 
  //
  // const message :DBMessage = {
  //   operation: 'GET',
  //   collection: 'users',
  //   data: { _id: 'abc123' },
  //   options: { fields: ['name', 'email'] },
  //   requestId: 'req-0005',
  //   timestamp: Date.now()
  // };

  const message: DBMessage = {
    operation: 'CREATE',
    collection: 'users',
    data: { name: "hoho", email: "as@as.com" },
    options: { fields: ['name', 'email'] },
    requestId: 'req-0005',
    timestamp: Date.now()
  };

  const job = await dbOpsQueue.add('dbOps', message);


  ctx.body = 'Hello from Service 2 (Koa + Socket.IO)';
});

export default router;


