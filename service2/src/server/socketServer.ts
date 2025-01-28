
import { Server } from 'socket.io';
import { setupRedisAdapter } from '../adapters/redisAdapter';
import { handleSocketConnection } from '../controllers/socketController';

export const createSocketServer = async (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const adapter = await setupRedisAdapter();
  io.adapter(adapter);

  handleSocketConnection(io);
  return io;
};
