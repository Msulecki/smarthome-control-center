import { useState } from 'react';
import Card from '../Card';
import PowerSetter from '../PowerSetter';
import emitter from '../../socketConnection/emitter';
import { brightnessIcon, hueIcon } from '../../assets/CardRoomIcons';
import { IRoom } from '../../interfaces';

interface ICardRoom {
  name?: string;
  roomData: IRoom;
}

const CardRoom = (props: ICardRoom) => {
  const { name, roomData } = props;

  const hasLightPower = !!Object.values(roomData.lightPower).length;
  const hasLightTemperature = !!Object.values(roomData.lightTemperature).length;
  const hasTemperature = !!Object.values(roomData.temperature).length;
  const hasHumidity = typeof roomData.temperature.Humidity === 'number';

  const range = [0, roomData?.lightPower.MaxDimLevel || 1];
  const defaultPower = roomData?.lightPower.LevelInt || 0;
  const isActive = roomData?.lightSwitch.Status === 'On';
  const colorData = JSON.parse(roomData?.lightTemperature.Color || '{}');
  const temperature = hasTemperature ? roomData?.temperature.Temp : '';
  const humidity = hasHumidity ? roomData?.temperature.Humidity : '';

  const lastUpdate =
    roomData?.lightPower.LastUpdate || roomData?.lightSwitch.LastUpdate || roomData?.temperature.LastUpdate;

  const additionalInfo = `${hasTemperature ? temperature + '°C' : ''}${hasTemperature && hasHumidity ? ' / ' : ''}${
    hasHumidity ? humidity + '%' : ''
  }`;

  const [toggleActive, setToggleActive] = useState<boolean>(isActive);
  const [brightness, setBrightness] = useState<number>(defaultPower);
  const [hue, setHue] = useState<number>(100 - colorData.t);

  const onToggleChange = (value: boolean) => {
    const event = {
      idx: roomData.lightSwitch.idx,
      name: 'Switch',
      value,
    };
    const socketData = JSON.stringify(event);

    if (value !== toggleActive) {
      emitter('devices:set', socketData);

      setToggleActive(value);
    }
  };

  const onBrightnessDataChange = (value: number) => {
    const event = {
      idx: roomData.lightPower.idx,
      name: 'Brightness',
      value,
    };
    const socketData = JSON.stringify(event);

    if (value !== brightness) {
      emitter('devices:set', socketData);

      setBrightness(value);
    }
  };

  const onLightTemperatureDataChange = (value: number) => {
    const event = {
      idx: roomData.lightTemperature.idx,
      name: 'Temperature',
      value,
    };
    const socketData = JSON.stringify(event);

    if (value !== hue) {
      emitter('devices:set', socketData);

      setHue(value);
    }
  };

  const CardRoomHeader = (
    <>
      <PowerSetter
        icon={brightnessIcon}
        callback={onBrightnessDataChange}
        isActive={toggleActive}
        defaultPower={brightness}
        setIsActive={onToggleChange}
        type='range'
        range={range}
        isAdjustable={hasLightPower}
      />

      {hasLightTemperature && (
        <PowerSetter
          icon={hueIcon}
          callback={onLightTemperatureDataChange}
          isActive={toggleActive}
          defaultPower={hue}
          setIsActive={onToggleChange}
          type='relative'
          range={[1, 100]}
          isAdjustable={true}
        />
      )}
    </>
  );

  return (
    <Card
      name={name || 'Room'}
      header={CardRoomHeader}
      additionalInfo={additionalInfo}
      footer={lastUpdate ? `Last update: ${lastUpdate}` : ''}
      isActive={toggleActive}
      toggle={onToggleChange}
    />
  );
};

export default CardRoom;
