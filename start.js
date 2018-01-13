const Command = require('./command');
const { sleep, run, rdmString, createSayString, sayAndLog } = require('./helpers');

module.exports = (vorpal, log, prompt, sessionId) => {

  let init = setTimeout(() => {
    log('Hello?');
    init = setTimeout(() => {
      log('Are you lost?');
      init = setTimeout(() => {
        log('Try typing "help".');
        init = setTimeout(() => {
          log('God, just type "start"...');
        }, 10000);
      }, 5000);
    }, 5000);
  }, 5000);

  vorpal.once('client_command_executed', () => {
    clearTimeout(init);
  });

  return new Command('start', 'Commence.', async (_args) => {
    run('afplay dial-up-modem-2.wav');
    await sleep(2000);
    const name = await run('whoami');
    await run(createSayString(`Hello ${name.trim()}`));
    log('Hello __name__.');
    await run(createSayString('I am Computer Intelligence System SATOSHI.')); //Apple type. Referencing the company.
    log('I am Computer Intelligence System SATOSHI.');
    await sayAndLog(`I\\'ve been programmed to test human intelligence,
      and further machine understanding of humans.
      Thank you for participating in this study.
      To continue, please type __\\"continue0\\"__.`);
    await run('killall afplay');
    log('Thank you :)');
  }, true);
}