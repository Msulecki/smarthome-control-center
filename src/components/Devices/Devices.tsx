import { useMemo } from 'react';
import CardRoom from '../CardRoom';
import getDevicesMapFromList from '../../functions/getDevicesMapFromList';
import { IDeviceProperties, IRoom } from '../../interfaces';

interface IDevices {
  deviceData: Array<IDeviceProperties>;
}

const Devices = (props: IDevices) => {
  const { deviceData } = props;

  const parsedDeviceData = useMemo(() => getDevicesMapFromList(deviceData), [deviceData]);

  return (
    <section className='devices'>
      <div className='devices__grid'>
        <CardRoom name='Salon' roomData={parsedDeviceData.livingRoom as IRoom} />
        <CardRoom name='Kuchnia' roomData={parsedDeviceData.kitchen as IRoom} />
        <CardRoom name='Sypialnia' roomData={parsedDeviceData.bedroom as IRoom} />
        <CardRoom name='Wąż' roomData={parsedDeviceData.snake as IRoom} />
      </div>
    </section>
  );
};

export default Devices;

// <CardRoom /> {/* TV */}
// <CardRoom /> {/* AC */}
// <CardRoom /> {/* SAMSUNG */}
// <CardRoom /> YEELIGHT */}
