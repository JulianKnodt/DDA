const Command = require('../command');
const { sleep, run, rdmString, createSayString, sayAndLog, clear, padRight } = require('../helpers');
const chalk = require('chalk');
const Nightmare = require('nightmare');

const content = (chalk.red(`Never said anything derogatory about Haitians other than Haiti is,
obviously, a very poor and troubled country.
Never said “take them out.”
Made up by *OMITTED*. I have a wonderful relationship with Haitians.
Probably should record future meetings - unfortunately, no trust!`)
+ '\n\n' +
chalk.white(`Now that Russian collusion, after one year of intense study,
has proven to be a total hoax on the American public,
the *OMITTED* and their lapdogs, the Fake *OMITTED*,
are taking out the old *OMITTED* playbook and screaming mental stability and intelligence.....`)
+ '\n\n' +
 chalk.blue(`....Actually, throughout my life, my two greatest assets have been mental stability and being, like, really smart.
Crooked *OMITTED* also played these cards very hard and,
as everyone knows, went down in flames.
I went from VERY successful businessman, to top T.V. Star.....`)).split('\n');

module.exports = (vorpal, log, prompt, sessionId) => new Command('continue1', 'Continue 1.', async (_args, self) => {
  run('afplay dial-up-modem-1.wav');
  await sleep(3000);
  const name = await run('whoami');
  log('...');
  await sayAndLog(`Oh, you\\'re still here.
    Please wait one moment.`, log);
  await sleep(3000);
  await run('afplay youGotmail.mp3');
  await sleep(2000);
  await sayAndLog(`Thank you for waiting.
    We will now run some more tests.
    Please feel free to express any emotion you might feel.`, log);
  await sleep(1000);

  run("afplay openingexercise06.mp3");

  const txt = chalk.blue((await run('cat ava.txt')).trim()).split('\n');
  for(const line of txt) {
    log(line);
    await sleep(100);
  };
  log('A portrait of __ava__');

  await sleep(10000);
  const q1 = 'Art';

  await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q1+0,
    message: 'Is this art? ',
  }, res));

  await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q1+1,
    message: 'If a machine created it, would it still be art? ',
  }, res));

  await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: q1+2,
    message: 'Did a person or a machine create this? ',
  }, res));

  let ans = await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: q1+3,
    message: 'Please describe how you feel: ',
  }, res));

  await sleep(3000);
  clear(log);

  run(createSayString(`We will now show some propaganda. Please describe how you feel. If at any time during the recording, you feel sick, please take a break from this survey.`));

  for(const line of content) {
    log(line);
    await sleep(1000);
  }
  log('');

  const q2 = 'Social';
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'checkbox',
    name: q2,
    message: 'Please describe how you feel: ',
    choices: ['like', 'angry', 'sad', 'wow', 'haha'],
  }, res)));

  await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q2+0,
    message: 'Do you have any other emotions related to these comments? ',
  }, res));

  await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q2+1,
    message: 'Would you like to share this? ',
  }, res));

  await sleep(1000);
  await run('afplay sarcasm.mp3');
  clear(log);
  await sleep(3000);

  await sayAndLog(`We will now run a recording of a movie.
    Please thoroughly describe your feelings
    after it has finished playing.`, log);

  run('afplay iRobot.mp3');

  let totalTime = 203000;

  const wt = async (time) => {
    await sleep(time)
    totalTime -= time;
  }

  const gibberish = setInterval(() => {
    log(rdmString(40))
  }, 2000);

  await wt(30000);

  log(padRight('In reality, none of these answers', 40));
  
  await wt(5000);

  log(padRight('are even being processed.', 40));

  await wt(7000);

  log(padRight('But what other way would there be for', 40));

  await wt(10000);

  log(padRight('a machine to ask these questions?', 40));

  await wt(10000);

  log(padRight('Do you consider this a machine asking?', 40));

  await wt(2000);

  log(padRight('Or a programmer? What\'s the difference?', 40));

  await wt(20000);

  log(padRight('Testing is something that people do', 40));

  await wt(4000);

  log(padRight('to ensure that programs are correct', 40));
  
  await wt(10000);

  log(padRight('Well.         ', 40));

  await wt(10000);

  log(padRight('Testing is simply an artistic indulgence now.', 40));

  //203 seconds;
  await sleep(totalTime);

  clearInterval(gibberish);
  clear(log);
  const q3 = 'man_and_machine';
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q3,
    default: true,
    message: 'Please describe how you feel: ',
  }, res)));

  await sleep(3000);

  const q4 = 'which_one';
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: q4,
    message: 'Who was the human? ',
  }, res)));

  await sleep(4000);

  const q5 = 'you sure';
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q5,
    default: false,
    message: 'Are you sure? ',
  }, res)));

  await sleep(3000);

  const q6 = 'robots_feel';
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q6,
    default: false,
    message: 'Do you think robots can feel? ',
  }, res)));


  await sleep(2000);

  clear(log);

  await sayAndLog(`Thank you for your answers.
  Your results are being processed.`, log);
  await sayAndLog(`Please type __\\"finish\\"__
    when you are ready to finish.`, log);
});