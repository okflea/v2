import http from 'http';
import app from './server/app';
import { createSocketServer } from './server/socketServer';
import { PORT } from './config';

const server = http.createServer(app.callback());

(async () => {
  try {
    await createSocketServer(server);
    server.listen(PORT, () => {
      console.log(`Service 2 running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
    process.exit(1);
  }
})();
