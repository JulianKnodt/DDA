const Command = require('./command');
const { sleep, run, rdmString, createSayString, sayAndLog } = require('./helpers');

module.exports = (vorpal, log, prompt, sessionId) => new Command('skip <to>', 'Skips to a specific continue', args => {
  for(let i = 0; i < args.to; i ++) {
    try {
      const cmd = vorpal.find(`continue${i}`);
      if (cmd) cmd.remove();
      eval(`createFlow(cont${i})`); // I have sinned, JavaScript gods.
    } catch(e) {
      //SILENCE MORTALS
    }
  }
}, false);