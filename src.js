const vorpal = require("vorpal")();
const Command = require('./command');

const log = vorpal.log.bind(vorpal);
const prompt = vorpal.prompt.bind(vorpal);
const sessionId = vorpal.session.id

const start = require('./start')(vorpal, log, prompt, sessionId);
const cont0 = require('./cont0')(vorpal, log, prompt, sessionId);
const skip = require('./skip')(vorpal, log, prompt, sessionId);

// process.on('unhandledRejection', (r, p) => {
//   //SILENCE MORTALS
// });

const createFlow = cmd => {
  if (!(cmd instanceof Command)) throw "cmd not an instance of Command";
  const c = vorpal.command(cmd.name, cmd.description)
  return c.action(async(args, cb) => {
    let action = cmd.action(args, vorpal);
    if (action instanceof Promise) action = await action;
    cb();
    if (cmd.shouldDelete) {
      const vorpalCmd = vorpal.find(cmd.name);
      if (vorpalCmd) vorpalCmd.remove();
    }
    cmd.next.forEach(createFlow);
  });
};

start.addNext(cont0);
createFlow(start);
createFlow(skip).hidden();

vorpal
.delimiter(": ")
.show();

