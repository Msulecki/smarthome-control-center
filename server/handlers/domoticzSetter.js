import fetcher from '../functions/fetcher.js';

const domoticzSetter = (apiUrl) => {
  return new Promise((resolve, reject) => {
    fetcher(apiUrl)
      .then((response) => {
        resolve(response.status);
      })
      .catch((error) => reject(error));
  });
};

export default domoticzSetter;
