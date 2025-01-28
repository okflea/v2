
import Koa from 'koa';
import router from '../routes';
import { errorHandler } from '../middlewares/errorHandler';

const app = new Koa();

app.use(errorHandler);
app.use(router.routes()).use(router.allowedMethods());

export default app;
