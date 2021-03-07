import emitter from './emitter';

const sshHandshake = (message: string) => {
  emitter(message);
};

export default sshHandshake;
