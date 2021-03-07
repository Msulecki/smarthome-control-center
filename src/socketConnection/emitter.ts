import { socket } from './index';

const emitter = (event: string, data: string = '') => {
  const encryptedEvent = btoa(event);
  const encryptedData = new TextEncoder().encode(data);

  socket.emit(encryptedEvent, encryptedData);
};

export default emitter;
