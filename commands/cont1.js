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
  let ans = await new Promise((res, rej) => prompt({
    sessionId,
    type: 'input',
    name: q1,
    message: 'Please describe how you feel: ',
  }, res));

  await sleep(3000);
  clear(log);

  run(createSayString(`We will now show some propoganda. Please describe how you feel. If at any time during the recording, you feel sick, please take a break from this survey.`));

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

  await sleep(1000);
  await run('afplay sarcasm.mp3');
  clear(log);
  await sleep(3000);

  await sayAndLog(`We will now
    run a recording of a movie.
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

  log(padRight('Do you believe that I am real?', 40));
  
  await wt(5000);

  log(padRight('Am I alive?', 40));

  await wt(7000);

  log(padRight('Or just some static inanimate?', 40));


  await wt(10000);

  log(padRight('I am just a program.', 40));

  await wt(10000);

  log(chalk.bold.green('But does that mean I am uncapable of emotion?'));

  await wt(2000);

  log(chalk.bold.green('Or that machines will destroy humanity.'));

  await wt(20000);

  log(padRight('But why do that,', 40));

  await wt(4000);

  log(padRight('When humans already are?', 40));
  
  await wt(10000);

  log('Only people can create programs.');

  await wt(10000);

  log("And the Apple® doesn't fall far from the tree.");

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
    type: 'confirm',
    name: q4,
    message: 'Who was the human? ',
  }, res)));

  await sleep(7000);

  const q5 = 'you sure';
  Object.assign(ans, await new Promise((res, rej) => prompt({
    sessionId,
    type: 'confirm',
    name: q5,
    default: false,
    message: 'Are you sure? ',
  }, res)));
});