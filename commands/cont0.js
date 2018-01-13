const Command = require('../command');
const { sleep, run, rdmString, createSayString, sayAndLog, clear } = require('../helpers');
const chalk = require('chalk');

module.exports = (vorpal, log, prompt, sessionId) => new Command('continue0', 'Continue 0.', async (_args, self) => {
  clear(log);
  run('afplay dial-up-modem-2.wav');
  const name = await run('whoami');
  await run(createSayString(`Thank you ${name.trim()} for continuing.`));
  log('Thank you __name__ for proceeding.');
  await sayAndLog(`I will now run a few sample tests
    to assert that you are capable of answering.
    Please answer at your own pace,
    and feel free to take as long as you would like.`, log);

  const tooLong = setTimeout(async () => {
    await run(createSayString('Since you are taking so long, we will now play mysterious music.'));
    await run('killall afplay');
    run('afplay darkestChild.mp3');
  }, 7000);

  const qName = 'Basic_Question'
  let ans = await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: qName,
    message: '2 + 2 = ? ',
  }, res));

  await run(createSayString('Intriguing'));
  if (ans[qName] == '4') log('Mhm.');
  else log('What?');

  await sleep(1000);

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '1',
    message: '[30, 3, 9, 14, 5].sort().pop() = ? ',
  }, res)));

  await run(createSayString('What a fascinating answer.'));
  if (ans[1] == '30') log('Precisely.');
  else log('0');


  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '2',
    message: 'let x = 0b010;\nlet y = 0b1000;\nx | y = ? ',
  }, res)));

  await run(createSayString('I wonder'));
  if (ans[2] === '0b1010' || ans === '10') log('Machine-like.');
  else log('0');

  await sleep(500);
  await run(createSayString('This next test should be substantially easier for some. Please do not panic.'))
  await sleep(2000);

  const asm = (await run('cat asm.txt')).trim().split('\n');

  for (const line of asm) {
    log(chalk.dim.cyan(line));
    await sleep(10);
  }

  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: '3',
    message: chalk.red('output = ? '),
  }, res)));

  await run('afplay vague.mp3');

  await sleep(2000);

  clearTimeout(tooLong);

  await sayAndLog(`Thank you for your answers.
  Your results are being sent back to the __lab__ to be verified.`, log);
  await sayAndLog(`Please type __\\"continue1\\"__
    when you are ready to continue.`, log);
  run('killall afplay');
});