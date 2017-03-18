'use strict';

import { assert } from 'chai';
import { Parser } from '../../src/Parser';
import { ResponseToken } from '../../src/Lexer/Token';
import pkg from '../../package.json';

/** @test {Parser} */
describe(`${pkg.name}/Parser/Parser`, () => {
  /** @test {Parser#constructor} */
  describe('#constructor', () => {
    it('Create a new instance of type Parser', () => {
      const token = new ResponseToken('hello human'),
            parser = new Parser([token]);

      assert.instanceOf(parser, Parser);
    });
  });
});
