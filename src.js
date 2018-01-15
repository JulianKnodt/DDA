#!/usr/bin/env node
const vorpal = require("vorpal")();
const Command = require('./command');
const createFlow = require('./createFlow')(vorpal);

const log = vorpal.log.bind(vorpal);
const prompt = vorpal.prompt.bind(vorpal);
const sessionId = vorpal.session.id

const start = require('./commands/start')(vorpal, log, prompt, sessionId);
const cont0 = require('./commands/cont0')(vorpal, log, prompt, sessionId);
const cont1 = require('./commands/cont1')(vorpal, log, prompt, sessionId);
const finish = require('./commands/finish')(vorpal, log, prompt, sessionId);

process.on('unhandledRejection', (r, p) => {
  //SILENCE MORTALS
});

cont1.addNext(finish);

cont0.addNext(cont1);

start.addNext(cont0);
createFlow(start);
// start.addNext(no);


const skip = require('./commands/skip')(vorpal, log, prompt, sessionId, createFlow);
createFlow(skip).hidden();

vorpal.delimiter(": ").show();

