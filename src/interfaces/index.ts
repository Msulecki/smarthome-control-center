export interface IDeviceProperties {
  AddjMulti: number;
  AddjMulti2: number;
  AddjValue: number;
  AddjValue2: number;
  BatteryLevel: number;
  Color: string;
  CustomImage: number;
  Data: string;
  Description: string;
  DimmerType: string;
  Favorite: number;
  HardwareID: number;
  HardwareName: string;
  HardwareType: string;
  HardwareTypeVal: number;
  HaveDimmer: boolean;
  HaveGroupCmd: boolean;
  HaveTimeout: boolean;
  Humidity?: number;
  ID: number;
  Image: string;
  IsSubDevice: boolean;
  LastUpdate: string;
  Level: number;
  LevelInt: number;
  MaxDimLevel: number;
  Name: string;
  PlanID: string;
  PlanIDs: Array<string>;
  Protected: boolean;
  ShowNotifications: boolean;
  SignalLevel: string;
  Status: string;
  StrParam1: string;
  StrParam2: string;
  SubType: string;
  SwitchType: string;
  SwitchTypeVal: number;
  Temp?: number;
  Timers: string;
  TypeImg: string;
  Unit: number;
  Used: number;
  UsedByCamera: boolean;
  XOffset: string;
  YOffset: string;
  idx: string;
}

export interface IApiData {
  ActTime: number;
  AstrTwilightEnd: string;
  AstrTwilightStart: string;
  CivTwilightEnd: string;
  CivTwilightStart: string;
  DayLength: string;
  NautTwilightEnd: string;
  NautTwilightStart: string;
  ServerTime: string;
  SunAtSouth: string;
  Sunrise: string;
  Sunset: string;
  app_version: string;
  result: Array<IDeviceProperties>;
  status: string;
  title: string;
}

interface IIdxMap {
  [key: string]: number | null;
}

export interface IIdxMapObject {
  [key: string]: IIdxMap;
}

export interface IRoom {
  lightSwitch: IDeviceProperties;
  lightPower: IDeviceProperties;
  lightTemperature: IDeviceProperties;
  temperature: IDeviceProperties;
}
