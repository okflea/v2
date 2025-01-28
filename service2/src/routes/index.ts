
import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Hello from Service 2 (Koa + Socket.IO)';
});

export default router;
