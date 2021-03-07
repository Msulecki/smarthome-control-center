import { Server } from 'socket.io';

const websocketHandler = (server) => {
  return new Server(server, {
    cors: {
      origin: process.env.ORIGIN_ADDRESS,
      methods: ['GET', 'POST'],
    },
  });
};

export default websocketHandler;
