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

    it('Should return "Hi, how is it going?"', () => {
      assert.match(botlang.reply('Hey'), /Hi, how is it going?/);
    });

    it('Should return "Hi, how are you?" or "Hey, how are you?"', () => {
      assert.match(botlang.reply('Hello there'), /Hi, how are you?|Hey, how are you?/);
    });

    it('Should return "Sorry, I do not know the answer to that question."', () => {
      assert.match(botlang.reply('Yay ...'), /Sorry, I do not know the answer to that question./);
    });
  });

  /** @test {Botlang#version} */
  describe('#version', () => {
    it('Should return the current version', () => {
      assert.equal(Botlang.version(), pkg.version);
    });
  });
});
