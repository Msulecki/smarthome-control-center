import brightnessIconOn from './light_power_on.png';
import brightnessIconOff from './light_power_off.png';
import hueIconOn from './light_hue_on.png';
import hueIconOff from './light_hue_off.png';

export interface IIcons {
  active: string;
  inactive: string;
}

const brightnessIcon: IIcons = {
  active: brightnessIconOn,
  inactive: brightnessIconOff,
};

const hueIcon: IIcons = {
  active: hueIconOn,
  inactive: hueIconOff,
};

export { brightnessIcon, hueIcon };
