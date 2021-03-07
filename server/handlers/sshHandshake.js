import sshHandler from './sshHandler.js';
import parseToBase64 from '../functions/parseToBase64.js';

const sshHandshake = (ws, sshServers) => {
  const eventOnName = parseToBase64('ssh:handshake');

  ws.on(eventOnName, () => {
    sshServers.forEach((server) => sshHandler(ws, server));
  });
};

export default sshHandshake;
