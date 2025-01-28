import Koa from 'koa';
import http from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const app = new Koa();
const PORT = process.env.PORT || 3002;

// Create HTTP server
const server = http.createServer(app.callback());

// Redis connection
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const pubClient = createClient({ url: redisUrl });
const subClient = pubClient.duplicate();

// Add error handlers for Redis clients
pubClient.on('error', (err) => {
  console.error('Redis pubClient error:', err);
});
subClient.on('error', (err) => {
  console.error('Redis subClient error:', err);
});

// Connect Redis clients
Promise.all([pubClient.connect(), subClient.connect()])
  .then(() => {
    console.log('Redis connected');
  })
  .catch((err) => {
    console.error('Failed to connect to Redis:', err);
    process.exit(1); // Exit process if Redis connection fails
  });

// Configure Socket.IO with Redis Adapter
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Basic Koa route
app.use(async (ctx) => {
  ctx.body = 'Hello from Service 2 (Koa + Socket.IO)';
});

// Start the server
server.listen(PORT, () => {
  console.log(`Service 2 running on port ${PORT}`);
});
