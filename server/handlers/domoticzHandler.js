import fetcher from '../functions/fetcher.js';
import parseToBase64 from '../functions/parseToBase64.js';
import emitter from '../functions/emitter.js';

const domoticzHandler = (ws, url) => {
  const eventName = parseToBase64('devices:list:get');

  ws.on(eventName, () => {
    fetcher(url)
      .then((response) => {
        emitter(ws, 'devices:list', JSON.stringify(response));
      })
      .catch((error) => {
        emitter(ws, 'devices:list:error', JSON.stringify(error));
      });
  });
};

export default domoticzHandler;
