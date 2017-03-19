'use strict';

import { assert } from 'chai';
import { Input, InputError, Lexer, Token } from '../../src/Lexer';
import reservedKeywords from '../../lang/ReservedKeywords.json';
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
    it('Ignore comments', () => {
      const input = new Input('# A comment'),
            token = new Lexer(input).next();

      assert.isNull(token);
    });

    it('Return string token', () => {
      const input = new Input('"Hello World"'),
            token = new Lexer(input).next();

      assert.instanceOf(token, Token);
      assert.strictEqual(token.getType(), 'string');
      assert.strictEqual(token.getValue(), 'Hello World');
    });

    it('Return numeric token', () => {
      const tests = [
        1, 1.2, 1234567890, 1234567.890
      ];

      tests.forEach((test) => {
        const input = new Input(test),
              token = new Lexer(input).next();

        assert.instanceOf(token, Token);
        assert.strictEqual(token.getType(), 'numeric');
        assert.strictEqual(token.getValue(), test);
      });
    });

    it('Return operation token', () => {
      const tests = [
        '+',
        '-',
        '*',
        '/',
        '%',
        '=',
        '&',
        '|',
        '<',
        '>',
        '!'
      ];

      tests.forEach((test) => {
        const input = new Input(test),
              token = new Lexer(input).next();

        assert.instanceOf(token, Token);
        assert.strictEqual(token.getType(), 'operation');
        assert.strictEqual(token.getValue(), test);
      });
    });

    it('Return punctuator token', () => {
      const tests = [
        ',',
        ';',
        '(',
        ')',
        '{',
        '}',
        '[',
        ']'
      ];

      tests.forEach((test) => {
        const input = new Input(test),
              token = new Lexer(input).next();

        assert.instanceOf(token, Token);
        assert.strictEqual(token.getType(), 'punctuator');
        assert.strictEqual(token.getValue(), test);
      });
    });

    it('Return identifier token', () => {
      const tests = [
        'functionName'
      ];

      tests.forEach((test) => {
        const input = new Input(test),
              token = new Lexer(input).next();

        assert.instanceOf(token, Token);
        assert.strictEqual(token.getType(), 'identifier');
        assert.strictEqual(token.getValue(), test);
      });
    });

    it('Return keyword token', () => {
      reservedKeywords.forEach((test) => {
        const input = new Input(test),
              token = new Lexer(input).next();

        assert.instanceOf(token, Token);
        assert.strictEqual(token.getType(), 'keyword');
        assert.strictEqual(token.getValue(), test);
      });
    });

    it('Throw invalid character error', () => {
      const input = new Input('~'),
            lexer = new Lexer(input);

      assert.throws(() => lexer.next(), Error, 'Invalid character (Line: 1, Column: 0)');
    });
  });

  /** @test {Lexer#peek} */
  describe('#peek', () => {
    it('Return the current token.', () => {
      const input = new Input('"hello botlang"'),
            lexer = new Lexer(input);

      assert.instanceOf(
        lexer.peek(), Token
      );
    });
  });
});
