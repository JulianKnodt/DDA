const Command = require('./command');
const { sleep, run, rdmString, createSayString, sayAndLog } = require('./helpers');
require('chalk');

module.exports = (vorpal, log, prompt, sessionId) => new Command('continue0', 'Continue 0.', async (_args, self) => {
  // run('afplay dial-up-modem-2.wav');
  const name = await run('whoami');
  // await run(createSayString(`Thank you ${name.trim()} for continuing.`));
  log('Thank you __name__ for proceeding.');
  // await sayAndLog(`I will now run a few sample tests
  //   to assert that you are capable of answering.
  //   Begin.`);
  // const tooLong = setTimeout(async () => {
  //   await run('killall afplay');
  //   await run(createSayString('Since you are taking so long, we will now play mysterious music.'));
  //   run('afplay darkestChild.mp3');
  // }, 20000);
  const qName = 'Basic_Question'
  const ans = await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: qName,
    message: '2 + 2 = ?',
  }, res));
  // await run('killall afplay');
  // clearTimeout(tooLong);
  log(chalk.red(ans));
  await sayAndLog(`Thank you for your answer.
  I must send your results back to
  the lab in order to verify them.`);
  await sayAndLog(`Please type __\\"continue1\\"__
    when you are ready to continue.`);
});