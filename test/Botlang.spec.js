'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';
import Botlang from '../src/Botlang';
import pkg from '../package.json';

/** @test {Botlang} */
describe(`${pkg.name}/Botlang`, () => {
  /** @test {Botlang#constructor} */
  describe('#constructor', () => {
    it('Create a new instance of type Botlang', () => {
      const sourceCode = fs.readFileSync(path.join(__dirname, 'Data', 'hello_world.bot'), {
              encoding : 'utf8',
              flag     : 'r'
            }),
            botlang = new Botlang(sourceCode);

      assert.instanceOf(botlang, Botlang);
    });
  });

  /** @test {Botlang#reply} */
  describe('#reply', () => {
    const sourceCode = fs.readFileSync(path.join(__dirname, 'Data', 'hello_world.bot'), {
            encoding : 'utf8',
            flag     : 'r'
          }),
          botlang = new Botlang(sourceCode);

    it('Should return an empty string', () => {
      assert.match(botlang.reply(''), /^$/);
    });

    it('Should return "Hi, how is it going?"', () => {
      assert.match(botlang.reply('Hey'), /Hi, how is it going?/);
    });

    it('Should return "I think Botlang is freakin awesome!"', () => {
      assert.match(
        botlang.reply('What do you think about Botlang?'),
        /(I think Botlang is freakin awesome!|I think Botlang is great!|I think Botlang is the coolest thing on Earth!)/
      );
    });

    it('Should return "Hi, how are you?" or "Hey, how are you?"', () => {
      assert.match(botlang.reply('Hello there'), /Hi, how are you?|Hey, how are you?/);
    });

    it('Should return "Sorry, I do not know the answer to that question."', () => {
      assert.match(botlang.reply('Yay ...'), /Sorry, I do not know the answer to that question./);
    });

    it('Should return "I love you too"', () => {
      assert.match(botlang.reply('I love you'), /I love you too./);
    });

    it('Should return "Can you think of why you might forget names?"', () => {
      assert.match(botlang.reply('Sometimes I forget names'), /Can you think of why you might forget names?/);
    });

    it('Should return "Im you too"', () => {
      assert.match(botlang.reply('I am good'), /Glad to hear that you are good./);
    });
  });

  /** @test {Botlang#version} */
  describe('#version', () => {
    it('Should return the current version', () => {
      assert.equal(Botlang.version(), pkg.version);
    });
  });
});
