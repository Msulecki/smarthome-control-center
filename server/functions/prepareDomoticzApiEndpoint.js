const prepareDomoticzApiEndpoint = (data) => {
  const { idx, name, value } = data;

  if (name === 'Switch') {
    return `/json.htm?type=command&param=switchlight&idx=${idx}&switchcmd=${value ? 'On' : 'Off'}`;
  } else if (name === 'Brightness') {
    return `/json.htm?type=command&param=switchlight&idx=${idx}&switchcmd=Set%20Level&level=${value}`;
  } else if (name === 'Temperature') {
    return `/json.htm?type=command&param=setkelvinlevel&idx=${idx}&kelvin=${100 - value}`;
  } else if (name === 'Color') {
  } else {
    throw new Error('Bad device type provided');
  }
};

export default prepareDomoticzApiEndpoint;
