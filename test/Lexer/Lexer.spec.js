'use strict';

import { assert } from 'chai';
import { Input, Lexer } from '../../src/Lexer';
import { ResponseToken, TriggerToken, VariableToken } from '../../src/Lexer/Token';
import pkg from '../../package.json';

/** @test {Lexer} */
describe(`${pkg.name}/Lexer/Lexer`, () => {
  /** @test {Lexer#constructor} */
  describe('#constructor', () => {
    it('Create a new instance of type Lexer', () => {
      const input = new Input('+ hello botlang');

      assert.instanceOf(
        new Lexer(input), Lexer
      );
    });
  });

  /** @test {Lexer#next} */
  describe('#next', () => {
    it('Return ResponseToken', () => {
      const input = new Input('- hello human'),
            token = new Lexer(input).next();

      assert.instanceOf(token, ResponseToken);
      assert.strictEqual(token.getValue(), ' hello human');
    });

    it('Return TriggerToken', () => {
      const input = new Input('+ hello botlang'),
            token = new Lexer(input).next();

      assert.instanceOf(token, TriggerToken);
      assert.strictEqual(token.getValue(), ' hello botlang');
    });

    it('Return VariableToken', () => {
      const input = new Input('$variable = 1'),
            token = new Lexer(input).next();

      assert.instanceOf(token, VariableToken);
      assert.strictEqual(token.getValue(), '1');
    });

    it('Skip comment', () => {
      const input = new Input('// An example comment'),
            token = new Lexer(input).next();

      assert.isNull(token);
    });

    it('Throw invalid character error', () => {
      const input = new Input('~'),
            lexer = new Lexer(input);

      assert.throws(() => {
        lexer.next('Parse error');
      }, Error, 'Invalid character (Line: 1, Column: 0)');
    });
  });
});
