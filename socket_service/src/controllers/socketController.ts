import { Server, Socket } from 'socket.io';
import os from 'os';

// Function to get the server's IP address
const getServerIP = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name] || []) {
      if (!iface.internal && iface.family === 'IPv4') {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // Default to localhost if no external IP found
};

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send the server IP to the connected client
    const serverIP = getServerIP();
    socket.emit('server-ip', serverIP);

    console.log("Server IP:" + serverIP);
    

    socket.on('message', (data) => {
      console.log(`Message received: ${data}`);
      socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
