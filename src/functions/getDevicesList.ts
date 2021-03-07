import emitter from '../socketConnection/emitter';
import listener from '../socketConnection/listener';

const getDevicesList = () => {
  emitter('devices:list:get');

  return new Promise((resolve, reject) => {
    listener('devices:list').then((data) => resolve(data));
    listener('devices:list:error').then((data) => reject(data));
  });
};

export default getDevicesList;
