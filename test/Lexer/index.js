'use strict';

import { assert } from 'chai';
import { Input, Lexer, Token } from '../../src/Lexer';
import pkg from '../../package.json';

describe(`${pkg.name}/Lexer`, () => {
  it('Exports Input, Lexer and Token class', () => {
    assert.isFunction(Input);
    assert.isFunction(Lexer);
    assert.isFunction(Token);
  });
});
