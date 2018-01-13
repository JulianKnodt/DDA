const { exec } = require('child_process');
const sleep = async (time) => new Promise((res, rej) => setTimeout(res, time));
const run = async (cmd) => new Promise((res, rej) => exec(cmd, (error, stdout, stderr) => {
  if (error) return rej(error);
  res(stdout);
  if(stderr) console.error(stderr);
}));

const rdmString = len => {
  let result = '';
  while(result.length < len) result += Math.random().toString(36).slice(2);
  return result.slice(0, len)
}

const padRight = (i, len) => (i + rdmString(len - i.length));

const createSayString = (txt, v="Daniel") => `say -i -v ${v.trim()} -r 1000 ${txt}`.trim();

const sayAndLog = async(txt,log) => {
  const lines = txt.split('\n').map(i => i.trim());
  for(const line of lines) {
    await run(createSayString(line));
    log(line);
  }
};

const clear = io => io('\u001b[2J\u001b[0;0H');

module.exports = {
  sleep,
  run,
  rdmString,
  createSayString,
  sayAndLog,
  clear,
  padRight,
}