const { exec } = require('child_process');
const sleep = async (time) => new Promise((res, rej) => setTimeout(res, time));
const run = async (cmd) => new Promise((res, rej) => exec(cmd, (error, stdout, stderr) => {
  if (error) return rej(error);
  res(stdout);
  if(stderr) console.error(stderr);
}));

const rdmString = len => Math.random()
  .toString(36)
  .slice(0, len);

const createSayString = txt => `say -i -v Daniel -r 1000 ${txt}`.trim();

const sayAndLog = async txt => {
  const lines = txt.split('\n').map(i => i.trim());
  for(const line of lines) {
    await run(createSayString(line));
    log(line);
  }
};

module.exports = {
  sleep,
  run,
  rdmString,
  createSayString,
  sayAndLog,
}