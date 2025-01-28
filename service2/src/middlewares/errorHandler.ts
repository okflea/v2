
import { Middleware } from 'koa';

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err:any) {
    console.error('Error occurred:', err);
    ctx.status = err.status || 500;
    ctx.body = { error: err.message || 'Internal Server Error' };
  }
};
