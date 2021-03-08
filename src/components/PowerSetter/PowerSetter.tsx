import { useState, useEffect, useCallback } from 'react';
import PowerIndicator from '../PowerIndicator';
import Badge from '../Badge';
import { IIcons } from '../../assets/CardRoomIcons';

interface IPowerSetter {
  defaultPower: number;
  isActive: boolean;
  setIsActive: Function;
  type: 'range' | 'relative';
  range: number[];
  callback: Function;
  icon: IIcons;
  isAdjustable?: boolean;
}

const PowerSetter = (props: IPowerSetter) => {
  const {
    defaultPower = 0,
    isActive = false,
    setIsActive = () => {},
    type = 'range',
    callback = () => {},
    range = [0, 100],
    icon = { active: '', inactive: '' },
    isAdjustable = false,
  } = props;

  const STEPS = range[1] - range[0];
  const STEP_RESOLUTION = 200 / STEPS;
  const isPowerBinary = range[1] - range[0] === 1;

  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [initialYPosition, setInitialYPosition] = useState<number | null>(null);
  const [initialPower, setInitialPower] = useState<number>(defaultPower);
  const [power, setPower] = useState<number>(defaultPower);

  const toggleSwitch = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsActive(!isActive);
  };

  const handlePress = () => {
    document.body.classList.add('locked');

    !isPressed && setIsPressed(true);
  };

  const handlePressCancel = useCallback(() => {
    document.body.classList.remove('locked');

    setInitialYPosition(null);
    setInitialPower(power);

    if (isPressed) {
      setIsActive(power > 0);
      setIsPressed(false);
    }

    callback(power);
  }, [power, callback, setIsActive, isPressed]);

  const handlePower = useCallback(
    (e) => {
      if (!isPressed) {
        return;
      }

      let yPosition;

      if (e.type === 'mousemove') {
        yPosition = Math.ceil(e.screenY) / STEP_RESOLUTION;
      } else if (e.type === 'touchmove') {
        e.stopPropagation();

        yPosition = Math.ceil(e.touches[0].screenY) / STEP_RESOLUTION;
      } else {
        return;
      }

      !initialYPosition && setInitialYPosition(yPosition + (initialPower || range[0]));

      const yOffset = Math.ceil((initialYPosition || range[0]) - yPosition);

      const calculatedPower = yOffset > range[1] ? range[1] : yOffset < range[0] ? range[0] : yOffset;

      power !== calculatedPower && initialYPosition && setPower(calculatedPower);
    },
    [isPressed, initialYPosition, power, initialPower, range, STEP_RESOLUTION]
  );

  useEffect(() => {
    if (isAdjustable) {
      window.addEventListener('mousemove', handlePower);
      window.addEventListener('touchmove', handlePower);
      window.addEventListener('mouseup', handlePressCancel);
      window.addEventListener('touchend', handlePressCancel);

      return () => {
        window.removeEventListener('mousemove', handlePower);
        window.removeEventListener('touchmove', handlePower);
        window.removeEventListener('mouseup', handlePressCancel);
        window.removeEventListener('touchend', handlePressCancel);
      };
    }
  }, [handlePower, handlePressCancel, isAdjustable]);

  const powerClassName = `power ${type}${isActive ? ' power--active' : ''}${
    isActive && !power ? ' power--nulled' : ''
  }`;

  return (
    <>
      <button
        className={powerClassName}
        onMouseDown={isAdjustable ? handlePress : toggleSwitch}
        {...(isAdjustable && { onTouchStart: handlePress })}
      >
        <img className='power__image' src={icon[isActive ? 'active' : 'inactive']} alt={`Toggle ${type}`} />
        {!isPowerBinary && <Badge isActive={isPressed} value={power} type={type} range={range} />}
      </button>
      {isPressed && <PowerIndicator power={power || range[0]} type={type} range={range} />}
    </>
  );
};

export default PowerSetter;
