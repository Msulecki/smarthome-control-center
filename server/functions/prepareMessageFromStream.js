import AU from 'ansi_up';

const ansi_up = new AU.default();
ansi_up.use_classes = true;

const prepareMessageFromStream = (stream) => {
  const rawMessage = stream.toString();

  let parsedFromAnsi = 'ERROR :: empty message';

  if (typeof rawMessage === 'undefined' || rawMessage.length === 0) {
    parsedFromAnsi = 'ERROR :: console returned nothing';
  } else {
    parsedFromAnsi = ansi_up.ansi_to_html(rawMessage);

    parsedFromAnsi = parsedFromAnsi[0].replace(/(\r\n|\n|\r)/gm, '') + parsedFromAnsi.slice(1);
  }

  const message = new Buffer.from(parsedFromAnsi);

  return message;
};

export default prepareMessageFromStream;
