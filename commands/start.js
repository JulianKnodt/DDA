const Command = require('../command');
const { sleep, run, rdmString, createSayString, sayAndLog, clear } = require('../helpers');
const chalk = require('chalk');

module.exports = (vorpal, log, prompt, sessionId) => {
  clear(log);
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
    clearTimeout(init);
    run('afplay dial-up-modem-2.wav');
    await sleep(2000);
    const name = await run('whoami');
    await run(createSayString(`Hello ${name.trim()}`));
    log('Hello __name__.');
    await run(createSayString('I am running a brief study of __HUMAN__ intelligence.')); //Referencing creator of bitcoin
    log('I am Computer Intelligence System SATOSHI.');
    await sayAndLog(`I\\'ve been programmed to further machine understanding of humans.
      Thank you for participating in this study.
      To continue, please type __\\"continue0\\"__.`, log);

    log(`\nYour id for this survey is ${chalk.red(rdmString(100))}`);
    log(`If you would like to contact a service representative after\nthis study, please call ***-***-****\nand have your id.`);
    log(chalk.white(`On behalf of Kingspound Labs, thank you.`));
  }, true);
}