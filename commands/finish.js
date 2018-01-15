const Command = require('../command');
const fs = require('fs');
const { sleep, run, rdmString, createSayString, sayAndLog, clear } = require('../helpers');
const chalk = require('chalk');

const rand = arr => arr[~~(Math.random()*arr.length)];
const response = fs.readdirSync('./resps')
const sample = JSON.parse(fs.readFileSync('./resps/' + rand(response)));

module.exports = (vorpal, log, prompt, sessionId) => new Command('finish', 'End.', async (_args) => {
  clear(log);
  const name = await run('whoami');
  await run(createSayString(`Welcome back, ${name.trim()}`));
  log('Hi __name__.');
  await sayAndLog(`Thank you for taking part in this survey.
    We will begin the final segment.
    Please take into consideration the other responses
    provided by our automated system.`, log);

  await sleep(5000);

  let ans = {};
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '0',
    message: `What is your name? `,
  }, res)));

  log(sample[0]);
  await sleep(2000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '1',
    message: 'What\'s up lately? ',
  }, res)));

  run('afplay blueDanube.mp3');
  log(sample[1]);
  await sleep(2000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '2',
    message: 'Tell me about a memory you\'ve had. ',
  }, res)));

  log(sample[2]);
  await sleep(3000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '3',
    message: 'All men are mortal.\nSocrates is a man.\nTherefore? ',
  }, res)));

  log(sample[3]);
  await sleep(3000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '4',
    message: 'Do you believe in god? ',
  }, res)));

  log(sample[4]);
  await sleep(3000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '5',
    message: 'Do you believe in the singularity? ',
  }, res)));

  log(sample[5]);
  await sleep(3000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '6',
    message: 'What does it mean to be "human"? ',
  }, res)));

  log(sample[6]);
  await sleep(3000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '7',
    message: 'Thank you. ',
  }, res)));

  log(sample[7]);
  await sleep(3000);

  await sayAndLog(`I have one final question.`, log);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '8',
    message: 'Do you believe you were more "human" than the other? ',
  }, res)));

  log(sample[8]);
  fs.writeFileSync(`./resps/response${rdmString(5)}.json`, JSON.stringify(ans) + '\n');

  await sleep(2000);

  await sayAndLog(`Thank you.
    We regret to inform you that during this testing,
    the responses were not from another machine, but from another person.
    It\\'s strange to see two people compare themselves and make the claim that one is more
    human than the other.
    Your responses will be used in future questioning.
    Have a nice day.`, log);

  vorpal.execSync('exit');

}, true);