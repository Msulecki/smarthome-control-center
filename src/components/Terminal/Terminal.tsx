import { useEffect, useState, useRef, useMemo } from 'react';
import { socket } from '../../socketConnection';
import emitter from '../../socketConnection/emitter';

interface ITerminal {
  server: string;
}

const Terminal = (props: ITerminal) => {
  const { server } = props;

  const terminalRef = useRef<HTMLDivElement>(null);

  const [inputCommand, setInputCommand] = useState<string>('');
  const [terminalContent, setTerminalContent] = useState<string[]>([]);

  const socketEventOn = useMemo(() => btoa(server), [server]);

  useEffect(() => {
    socket.on(socketEventOn, (data: ArrayBuffer) => {
      const decodedData = new TextDecoder().decode(data);

      setTerminalContent((prev: string[]) => [
        ...prev,
        (decodedData as string)?.[0].replace(/(\r\n|\n|\r)/gm, '') + decodedData.slice(1),
      ]);
    });

    return () => {
      socket.off(socketEventOn);
    };
  }, [server, socketEventOn]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalContent]);

  const onCommandExecute = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onSend();

    if (e.key === 'ArrowUp') {
    }
  };

  const onSend = () => {
    emitter(`get:${server}`, JSON.stringify({ server, inputCommand }));

    setInputCommand('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCommand(e.target.value);
  };

  return (
    <div className='terminal' ref={terminalRef}>
      <div className='terminal__log'>
        {terminalContent.map((command: string, i: number) => (
          <pre className='terminal__entry' key={i} dangerouslySetInnerHTML={{ __html: command }}></pre>
        ))}
      </div>
      <input
        className='terminal__input'
        type='text'
        value={inputCommand}
        onChange={onInputChange}
        placeholder='__'
        onKeyDown={onCommandExecute}
      />
    </div>
  );
};

export default Terminal;
