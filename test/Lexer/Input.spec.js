'use strict';

import { assert } from 'chai';
import Input from '../../src/Lexer/Input';
import pkg from '../../package.json';

/** @test {Input} */
describe(`${pkg.name}/Lexer/Input`, () => {
  /** @test {Input#constructor} */
  describe('#constructor', () => {
    it('Create a new instance of type Input', () => {
      assert.instanceOf(new Input(''), Input);
    });
  });

  /** @test {Input#eof} */
  describe('#eof', () => {
    it('Determine whether or not there are no more values in the stream.', () => {
      const stream = new Input('');
      assert.isTrue(stream.eof());
    });
  });

  /** @test {Input#error} */
  describe('#error', () => {
    it('Throw a new Error.', () => {
      const stream = new Input('');

      assert.throws(() => {
        stream.error('Parse error');
      }, Error, 'Parse error (Line: 1, Column: 0)');
    });
  });

  /** @test {Input#next} */
  describe('#next', () => {
    it('Return the next value from the stream.', () => {
      const stream = new Input('> hello botlang');

      assert.strictEqual(stream.next(), ' ');
      assert.strictEqual(stream.next(), 'h');
      assert.strictEqual(stream.next(), 'e');
      assert.strictEqual(stream.next(), 'l');
      assert.strictEqual(stream.next(), 'l');
      assert.strictEqual(stream.next(), 'o');
      assert.strictEqual(stream.next(), ' ');
      assert.strictEqual(stream.next(), 'b');
      assert.strictEqual(stream.next(), 'o');
      assert.strictEqual(stream.next(), 't');
      assert.strictEqual(stream.next(), 'l');
      assert.strictEqual(stream.next(), 'a');
      assert.strictEqual(stream.next(), 'n');
      assert.strictEqual(stream.next(), 'g');
    });
  });

  /** @test {Input#peek} */
  describe('#peek', () => {
    it('Return the value from the current position.', () => {
      const stream = new Input('> hello botlang');

      assert.strictEqual(stream.peek(), '>');
    });
  });
});
