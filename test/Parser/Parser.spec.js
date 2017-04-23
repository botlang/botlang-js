'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';
import Parser from '../../src/Parser';
import { Input, Lexer } from '../../src/Lexer';
import helloWorldAst from '../Data/hello_world.ast.json';
import pkg from '../../package.json';

/** @test {Parser} */
describe(`${pkg.name}/Parser/Parser`, () => {
  /** @test {Parser#constructor} */
  describe('#constructor', () => {
    it('Create a new instance of type Parser', () => {
      const input = new Input('+Hello World'),
            lexer = new Lexer(input),
            parser = new Parser(lexer);

      assert.instanceOf(parser, Parser);
    });
  });

  /** @test {Parser#parse} */
  describe('#parse', () => {
    it('Parse program', () => {
      const sourceCode = fs.readFileSync(path.join(__dirname, '..', 'Data', 'hello_world.bot'), {
              encoding : 'utf8',
              flag     : 'r'
            }),
            input = new Input(sourceCode),
            lexer = new Lexer(input),
            parser = new Parser(lexer),
            code = parser.parse();

      assert.isObject(code);
      assert.deepEqual(code, helloWorldAst);
    });
  });
});
