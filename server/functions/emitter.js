import parseToBase64 from './parseToBase64.js';

const emitter = (ws, event, data) => {
  const encryptedEvent = parseToBase64(event);
  const encryptedData = new Buffer.from(data);

  ws.emit(encryptedEvent, encryptedData);
};

export default emitter;
