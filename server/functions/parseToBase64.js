const parseToBase64 = (string) => new Buffer.from(string, 'utf-8').toString('base64');

export default parseToBase64;
