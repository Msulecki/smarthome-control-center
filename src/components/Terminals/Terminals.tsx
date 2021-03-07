import { useEffect } from 'react';
import Terminal from '../Terminal';
import sshHandshake from '../../socketConnection/sshHandshake';

const Terminals = () => {
  const servers = process.env.REACT_APP_SERVERS?.split(',');

  useEffect(() => {
    sshHandshake('ssh:handshake');
  }, []);

  if (!servers) {
    return null;
  }

  return (
    <section className='terminals'>
      {servers.map((server) => (
        <Terminal key={server} server={server} />
      ))}
    </section>
  );
};

export default Terminals;
