[![Build Status Master](https://api.travis-ci.org/botlang/botlang-js.svg?branch=master)](https://travis-ci.org/botlang/botlang-js)
[![Source code documentation coverage](https://doc.esdoc.org/github.com/botlang/botlang-js/badge.svg)](https://doc.esdoc.org/github.com/botlang/botlang-js/)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/botlang/botlang-js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/botlang/botlang-js/?branch=master)

# Botlang JS
Botlang Implementation for JavaScript.

## Install

```sh
# Use the no-bin-links flag if you're running the program on a file system which does not support symlinks (like an usb stick)
$ npm install --no-bin-links
```

## Getting started with the cli
Botlang ships with a command line application, which lets you easily explore your botlang scripts through in the command line. If you just want to play around with an example run `npm start` which loads the [ELIZA bot](./example/eliza.bot) example into the cli.

### Usage
```sh
$ ./bin/cli "<path-to-your-botlang-script>"
```

### Usage in your own application
```js
  import * as fs from 'fs';
  import Botlang from 'botlang';

  const sourceCode = fs.readFileSync('path-to-your-botlang-script', {
          encoding : 'utf8',
          flag     : 'r'
        }),
        bot = new Botlang(sourceCode);

  console.log(
    bot.reply('user-input')
  );
```

## Language features

### Pattern/ response model
Botlang's underlying powerful pattern-response model is the core of the language. It allows you to define simple string pattern which enables the interpreter to response with one or more pre-defined responses. The interpreter is case insensitive.

A pattern definition starts with a plus sign (`+`) followed by a string enclosed in double quotation marks (`"`). A response is defined by a minus sign (`-`) followed by a string enclosed in double quotation marks.

Example:
```bot
  + "Hey"
  - "Hi, how are you?"
```

If you define more than one response the botlang interpreter will choose one randomly.

Example:
```bot
  + "Hey"
  - "Hi, how are you?"
  - "Hey, how are you?"
  - "Hi, how is it going?"
```

### Wild-cards
Wild-cards in botlang are a powerful tool for writing more advanced matching pattern. A wild-card is represented by the asterisk character `*`.

Example:
```bot
  + "*"
  - "I'm not sure I understand you fully."
  - "Please go on."
  - "That is interesting. Please continue."
  - "Tell me more about that."
  - "Does talking about this bother you?"
  - "I see."
```

### Multiple choice matching
The multiple choice matching pattern let you define an arbitrary array of matching options. Multiple choice options are enclosed by parenthesis and separated by the pipe character `(option_one|option_two|...)`.
```bot
  + "* (bye|goodbye|done|exit|quit) *"
  - "Goodbye. It was nice talking to you."
  - "Goodbye. This was really a nice talk."
```

### String substitution
Botlang's string substitution feature let you create more realistic conversations by picking up certain words from the user input. A string substitution is expressed by the dollar sign within your pattern.
```bot
  + "I $ you"
  - "Perhaps in your fantasies we $ each other."
  - "Do you wish to $ me?"
```

### Comments
For commenting your botlang scripts use the hash sign `#`.

## Source code documentation
The project uses [ESDoc](https://esdoc.org/) for generating source code documentation. Consult the project website for related questions and use appropriate tags in the code. The standard output directory for local development is `doc/`. The build process can be triggered via the cli `npm run make:doc`.

The online source code documentation can be found [here](https://doc.esdoc.org/github.com/botlang/botlang-js/).

### Update online documentation
```sh
# To trigger the build process for the hosted documentation fire this curl cmd
# or follow the instruction on https://doc.esdoc.org/-/generate.html
$ curl -X POST \
       -H 'Accept: application/json' \
       -H 'content-type: application/x-www-form-urlencoded' \
       -d 'gitUrl=git@github.com:botlang/botlang-js.git' \
      'https://doc.esdoc.org/api/create'
```

## License
This distribution is covered by the **GNU GENERAL PUBLIC LICENSE**, Version 3, 29 June 2007.

## Support & Contact
Having trouble with this repository? Check out the documentation at the repository's site or contact m@matchilling.com and we’ll help you sort it out.

Happy Coding

:v:
