import fs from 'fs';
import { NodeSSH } from 'node-ssh';
import prepareMessageFromStream from '../functions/prepareMessageFromStream.js';
import parseToBase64 from '../functions/parseToBase64.js';

const sshHandler = async (ws, server) => {
  const ssh = new NodeSSH();

  const sshConfig = {
    host: server,
    username: 'pi',
    privateKey: fs.readFileSync('KEYS/id_rsa', 'utf8'),
  };

  await ssh.connect(sshConfig);

  const shellStream = await ssh.requestShell();

  const socketEventOn = parseToBase64(`get:${server}`);
  const socketEventEmit = parseToBase64(server);

  ws.on(socketEventOn, (message) => {
    const data = JSON.parse(message);
    if (data.server === server && data.inputCommand) {
      shellStream.write(data.inputCommand.trim() + '\n');
    }
  });

  shellStream.on('data', (data) => {
    ws.emit(socketEventEmit, prepareMessageFromStream(data));
  });

  shellStream.stderr.on('data', (data) => {
    ws.emit(socketEventEmit, prepareMessageFromStream(data));
  });
};

export default sshHandler;
