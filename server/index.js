import dotenv from 'dotenv';
import express from 'express';
import websocketHandler from './handlers/websocketHandler.js';
import domoticzHandler from './handlers/domoticzHandler.js';
import sshHandshake from './handlers/sshHandshake.js';
import { createServer } from 'http';
import deviceUpdateHandler from './handlers/deviceUpdateHandler.js';

dotenv.config();

const app = express();
const server = createServer(app);

const io = websocketHandler(server);

const PORT = process.env.SERVER_PORT;
const sshServers = process.env.SSH_SERVERS.split(',');

const domoticzApiUrl = process.env.DOMOTICZ_API_URL;
const domoticzDeviceListEndpoint = domoticzApiUrl + process.env.DOMOTICZ_DEVICE_LIST_ENDPOINT;

io.on('connection', (socket) => {
  domoticzHandler(socket, domoticzDeviceListEndpoint);
  deviceUpdateHandler(socket, domoticzApiUrl);
  sshHandshake(socket, sshServers);
});

app.get('/', (req, res) => {
  res.send('It works!');
});

server.listen(PORT, () => {
  console.log('listening on', PORT);
});
