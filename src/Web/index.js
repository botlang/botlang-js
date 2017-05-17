'use strict';

import * as Buffer from 'buffer';
import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';

import Botlang from '../Botlang';
import Styles from './../Cli/Styles';

const options = new Map()
        .set('port', 8080)
        .set('quite', false),
      /**
       * @param  {Object} request - https://nodejs.org/api/http.html#http_class_http_incomingmessage
       * @param  {Object} response
       * @return {void}
       */
      requestHandler = (request, response) => {
        request.url = url.parse(request.url, true);

        const brain = request.headers.hasOwnProperty('x-brain')
                && fs.existsSync(`${__dirname}/../../example/${request.headers['x-brain']}.bot`)
                ? request.headers['x-brain']
                : 'eliza',
              isText = request.headers.hasOwnProperty('content-type')
                && 'text/plain' === request.headers['content-type'],
              say = request.url.query.say
                ? request.url.query.say
                : null,
              sourceCode = fs.readFileSync(`${__dirname}/../../example/${brain}.bot`, {
                encoding : 'utf8',
                flag     : 'r'
              }),
              bot = new Botlang(sourceCode),
              now = new Date().toISOString().substring(0, 19).replace(/(T|Z)/g, ' '),
              reply = bot.reply(say),
              body = isText ? reply : JSON.stringify({
                reply
              });

        write(`${Styles.yellow.open}${now} [SRV]:${Styles.yellow.close} Brain: "${brain}" loaded.`);
        write(`${Styles.green.open}${now} [USR]:${Styles.green.close} ${say}`);
        write(`${Styles.green.open}${now} [BOT]:${Styles.green.close} ${reply}`);

        response.writeHead(200, {
          'Content-Length' : Buffer.Buffer.byteLength(body, 'utf8'),
          'Content-Type'   : isText ? 'text/plain' : 'application/json'
        });

        response.end(body);
      },
      server = http.createServer(requestHandler),
      /**
       * @param  {*} args
       * @return {void}
       */
      write = (...args) => {
        if (0 !== args.length && !options.get('quite')) process.stdout.write(`${args}\n`);
      };

// Set options
process.argv.forEach((arg) => {
  if ('--quite=' === arg.substr(0, 8)) {
    options.set('quite', 'true' === arg.substr(8));
  }
});

// Start listening
server.listen(options.get('port'), (err) => {
  if (err) throw new Error(err);

  write(`${Styles.red.open}`);
  write('# -----------------------------------------------------------------------------');
  write(`# Web server with botlang#${Botlang.version()} listening on "http://127.0.0.1:${options.get('port')}".`);
  write('# -----------------------------------------------------------------------------');
  write('# This web server was designed to aid application development. It may also be');
  write('# useful for testing purposes or for application demonstrations that are run in');
  write('# controlled environments. It is not intended to be a full-featured web server.');
  write('# It should not be used on a public network.');
  write('# -----------------------------------------------------------------------------');
  write(`${Styles.red.close}`);
});
