const Command = require('./command');

module.exports = vorpal => function createFlow(cmd) {
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