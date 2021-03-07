import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Header from './Header';
import Devices from './Devices';
import Terminals from './Terminals';
import Footer from './Footer';
import getDevicesList from '../functions/getDevicesList';
import { IDeviceProperties, IApiData } from '../interfaces';

const App = () => {
  const [systemData, setSystemData] = useState<Exclude<IApiData, IDeviceProperties[]>>();
  const [deviceData, setDeviceData] = useState<IDeviceProperties[]>();
  const [isFetchingComplete, setIsFetchingComplete] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<any>();

  useEffect(() => {
    if (!deviceData) {
      getDevicesList()
        .then((response: any) => {
          if (response.status !== 'OK') {
            return;
          }
          const systemDataResponse = Object.assign({}, response);
          delete systemDataResponse.result;

          setSystemData(systemDataResponse);
          setDeviceData(response.result);
        })
        .catch((error) => setErrorData(error))
        .finally(() => {
          setIsFetchingComplete(true);
        });
    }
  }, [deviceData]);

  useEffect(() => {
    deviceData && console.log(systemData);
  }, [deviceData, systemData]);

  if (!isFetchingComplete) {
    return <LoadingScreen text='Connecting' />;
  }

  if (errorData) {
    return <LoadingScreen text={`Error: ${JSON.stringify(errorData)}`} />;
  }

  return (
    <main className='app'>
      <Header />
      <Devices deviceData={deviceData!} />
      <Terminals />
      <Footer />
    </main>
  );
};

export default App;
