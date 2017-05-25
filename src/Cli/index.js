'use strict';

import * as fs from 'fs';
import * as readline from 'readline';

import Botlang from '../Botlang';
import Styles from './Styles';

if ('undefined' === typeof process.argv[2]) {
  process.stdout.write(`${Styles.red.open}No botscript has been defined.${Styles.red.close}\n`);
  process.stdout.write(`${Styles.red.open}Usage: "/botlang <path-to-your-botlang-script>"${Styles.red.close}\n`);
  process.exit(1);
} else if (-1 !== ['-h', '--help'].indexOf(process.argv[2])) {
  process.stdout.write('Usage: botlang <script.bot>\n\n');
  process.stdout.write('Options:\n');
  process.stdout.write('  -h, --help    Show this help context\n');
  process.stdout.write('  -v, --version Print botlang version\n\n');
  process.stdout.write('Learn more on https://botlang.org\n');
  process.exit(0);
} else if (-1 !== ['-v', '--version'].indexOf(process.argv[2])) {
  process.stdout.write(`v${Botlang.version()}\n`);
  process.exit(0);
} else if (!fs.existsSync(process.argv[2])) {
  process.stdout.write(`${Styles.red.open}File "${process.argv[2]}" does not exist.${Styles.red.close}\n`);
  process.stdout.write(`${Styles.red.open}Type "botlang --help" to print the help context.${Styles.red.close}\n`);
  process.exit(1);
}

const options = new Map()
        .set('botname', 'Bot')
        .set('path', process.argv[2])
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
write(`🤖 Welcome to botlang#${Botlang.version()}\n`);
write(`  Brain from "${options.get('path')}" loaded\n`);
write(`${Styles.yellow.close}\n`);

rl.setPrompt(`${Styles.green.open}[${options.get('username')}]:${Styles.green.close} `);
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();

  if ('' === input) write();
  else if (/\\help/.test(input)) writeSys('Not implemented yet. Read the source code in the meantime ...\n');
  else if (/\\version/.test(input)) writeSys(`${Botlang.version()}\n`);
  else writeBot(`${bot.reply(input)}\n`);

  rl.prompt();
});

rl.on('close', () => {
  write(`\n\n${Styles.yellow.open}🤖 Bye bye ...${Styles.yellow.close}\n`);
  process.exit(0);
});
