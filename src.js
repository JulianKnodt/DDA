const vorpal = require("vorpal")();
const { sleep, run, rdmString } = require('./helpers')
const Command = require('./command');

const log = vorpal.log.bind(vorpal);

process.on('unhandledRejection', (r, p) => {
  //SILENCE MORTALS
});

const createFlow = cmd => {
  if (!(cmd instanceof Command)) throw "cmd not an instance of Command";
  vorpal
  .command(cmd.name, cmd.description)
  .action(async(args, callback) => {
    let action = cmd.action(args);
    if (action instanceof Promise) action = await action;
    callback();
    if (cmd.shouldDelete) {
      const vorpalCmd = vorpal.find(cmd.name);
      if (vorpalCmd) vorpalCmd.remove();
    }
    cmd.next.forEach(createFlow);
  });
};

const createSayString = txt => `say -i -v Daniel -r 1000 ${txt}`.trim();

const sayAndLog = async txt => {
  const lines = txt.split('\n').map(i => i.trim());
  for(const line of lines) {
    await run(createSayString(line));
    log(line);
  }
};

const start = new Command('start', 'Commence.', async (_args) => {
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
    To continue, please type __\\"continue\\"__.`);
  await run('killall afplay');
  log('Thank you :)');
}, true);

const cont0 = new Command('continue', 'Continue 0.', async (_args) => {
  run('afplay dial-up-modem-2.wav');
  const name = await run('whoami');
  await run(createSayString(`Thank you ${name.trim()} for continuing.`));
  log('Thank you __name__ for proceeding.');
  await sayAndLog(`I will now run a few sample tests
    to assert that you are capable of answering.
    Begin.`);
  await run('killall afplay');
});
start.addNext(cont0);

createFlow(start);

vorpal
.delimiter(": ")
.show();

