import emitter from '../socketConnection/emitter';
import listener from '../socketConnection/listener';

const getDevicesList = () => {
  emitter('devices:list:get');

  return new Promise((resolve, reject) => {
    listener('devices:list')
      .then((data) => resolve(data))
      .catch((error) => reject(`Error getting device list: ${error}`));

    listener('devices:list:error')
      .then((data) => reject(data))
      .catch((error) => reject(`Error getting device list: ${error}`));
  });
};

export default getDevicesList;
