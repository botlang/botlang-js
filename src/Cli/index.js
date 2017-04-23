'use strict';

import * as fs from 'fs';
import * as readline from 'readline';

import Botlang from '../Botlang';
import pkg from '../../package.json';
import Styles from './Styles';

const options = new Map()
        .set('botname', 'Bot')
        .set('path', process.argv[process.argv.length - 1])
        .set('prompt', '> ')
        .set('system', 'Sys')
        .set('username', 'You'),
      rl = readline.createInterface({
        input  : process.stdin,
        output : process.stdout
      }),
      sourceCode = fs.readFileSync(options.get('path'), {
        encoding : 'utf8',
        flag     : 'r'
      }),
      bot = new Botlang(sourceCode),
      write = (text) => {
        process.stdout.write(`${text}`);
      },
      writeBot = (text) => {
        write(`${Styles.green.open}[${options.get('botname')}]:${Styles.green.close} ${text}`);
      },
      writeSys = (text) => {
        write(`${Styles.green.open}[${options.get('system')}]:${Styles.green.close} ${text}`);
      };

write(`\n${Styles.yellow.open}`);
write(`🤖 Welcome to botlang#${pkg.version}\n`);
write(`   Brain from "${options.get('path')}" loaded\n`);
write(`${Styles.yellow.close}\n`);

rl.setPrompt(`${Styles.green.open}[${options.get('username')}]:${Styles.green.close} `);
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();

  if (/\\help/.test(input)) {
    writeSys('Not implemented yet. Read the source code in the meantime ...\n');
  } else {
    writeBot(`${bot.reply(input)}\n`);
  }

  rl.prompt();
});

rl.on('close', () => {
  write(`\n\n${Styles.yellow.open}🤖 Bye bye ...${Styles.yellow.close}\n`);
  process.exit(0);
});
