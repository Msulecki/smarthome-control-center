import idxMap from '../config/idxMap.json';
import { IDeviceProperties, IIdxMapObject, IRoom } from '../interfaces';

const getDevicesMapFromList = (devicesList: IDeviceProperties[]) => {
  const roomsMap: IIdxMapObject = idxMap;
  const parsedDevicesMap: { [key: string]: IRoom | {} } = {};

  Object.keys(roomsMap).forEach((room) => {
    parsedDevicesMap[room] = {};

    Object.keys(roomsMap[room]).forEach((mappedDevice) => {
      const idxToSearch = roomsMap[room][mappedDevice];
      const deviceToMap = devicesList.filter((connectedDevice) => `${connectedDevice.idx}` === `${idxToSearch}`)[0];

      Object.assign(parsedDevicesMap[room], { [mappedDevice]: deviceToMap || {} });
    });
  });

  return parsedDevicesMap;
};

export default getDevicesMapFromList;
