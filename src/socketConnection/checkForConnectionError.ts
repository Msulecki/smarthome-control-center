import { socket } from './index';

const checkForConnectionError = () => {
  return new Promise((resolve, reject) => {
    socket.on('connect_error', (data: any) => {
      reject(data);
    });
  });
};

export default checkForConnectionError;
