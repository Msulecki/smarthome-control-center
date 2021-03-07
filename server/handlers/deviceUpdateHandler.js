import parseToBase64 from '../functions/parseToBase64.js';
import emitter from '../functions/emitter.js';
import prepareDomoticzApiEndpoint from '../functions/prepareDomoticzApiEndpoint.js';
import domoticzSetter from '../handlers/domoticzSetter.js';

const deviceUpdateHandler = (ws, apiUrl) => {
  const eventName = parseToBase64('devices:set');

  ws.on(eventName, (data) => {
    const parsedData = JSON.parse(data.toString());

    const endpoint = apiUrl + prepareDomoticzApiEndpoint(parsedData);

    domoticzSetter(endpoint)
      .then((response) => {
        if (response === 'OK') {
          //emit ok
        } else {
          //emit not ok
        }
      })
      .catch((error) => {
        //emit error
      });
  });
};

export default deviceUpdateHandler;
