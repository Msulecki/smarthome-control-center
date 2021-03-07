import { socket } from './index';

const listener = (event: string) => {
  const encryptedEvent = btoa(event);

  return new Promise((resolve) => {
    socket.on(encryptedEvent, (data: any) => {
      const dataArray = new Uint8Array(data);
      const response = JSON.parse(new TextDecoder().decode(dataArray));

      socket.off(encryptedEvent);

      resolve(response);
    });
  });
};

export default listener;
