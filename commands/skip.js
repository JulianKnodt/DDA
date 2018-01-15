const Command = require('../command');
const { sleep, run, rdmString, createSayString, sayAndLog } = require('../helpers');

module.exports = (vorpal, log, prompt, sessionId, createFlow) => new Command('skip <to>', 'Skips to a specific continue', args => {
  for(let i = 0; i < args.to; i ++) {
    try {
      const cmd = vorpal.find(`continue${i}`);
      if (cmd) cmd.remove();
      eval(`createFlow(require('./cont${i}')(vorpal, log, prompt, sessionId))`); // I have sinned, JavaScript gods.
    } catch(e) {
      // log(e)
      //SILENCE MORTALS
    }
  }
  createFlow(require('./finish')(vorpal, log, prompt, sessionId));
}, false);

