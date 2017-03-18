'use strict';

import Input from './Input';
import reservedKeywords from '../../lang/ReservedKeywords.json';
import { ResponseToken, TriggerToken, VariableToken } from './Token';

export default class Lexer {
  /**
   * Create a Lexer.
   * @param {Input} input
   */
  constructor(input) {
    if (!(input instanceof Input)) {
      throw new TypeError('Argument "input" must be an instance of type "Input".');
    }

    /**
     * @private
     * @type {Token}
     */
    this.currentToken = null;

    /**
     * @private
     * @type {Input}
     */
    this.input = input;

    /**
     * @private
     * @type {Array}
     */
    this.keywords = reservedKeywords;
  }

  /**
   * @private
   */
  static isWhitespace(char) {
    return /\s/.test(char);
  }

  /**
   * Return next token
   * @return {Token}
   */
  next() {
    const token = this.currentToken;
    this.currentToken = null;

    return token || this.nextToken();
  }

  /**
   * @private
   */
  nextToken() {
    // Ignore whitespace
    this.readWhile(Lexer.isWhitespace);

    // Return if is end of stream
    if (this.input.eof()) {
      return null;
    }

    // Get the current character
    let char = this.input.peek();

    // Read trigger
    if ('+' === char) {
      return this.readTrigger();
    }

    // Read response
    if ('-' === char) {
      return this.readResponse();
    }

    if ('/' === char) {
      char = this.input.next();

      if ('/' === char) {
        this.skipComment();
        return this.nextToken();
      }
    }

    if ('$' === char) {
      return this.readVariable();
    }

    return this.input.error('Invalid character');
  }

  /**
   * @private
   */
  readEscaped(end) {
    let escaped = false,
        str = '';

    while (!this.input.eof()) {
      const char = this.input.next();

      if (escaped) {
        str += char;
        escaped = false;
      } else if ('\\' === char) {
        escaped = true;
      } else if (char === end) {
        break;
      } else {
        str += char;
      }
    }

    return str;
  }

  /**
   * @private
   * @return {ResponseToken}
   */
  readResponse() {
    return new ResponseToken(this.readEscaped());
  }

  /**
   * @private
   * @return {TriggerToken}
   */
  readTrigger() {
    return new TriggerToken(this.readEscaped());
  }

  /**
   * @private
   * @return {VariableToken}
   */
  readVariable() {
    const name = this.readEscaped(' '),
          value = this.readEscaped().replace(/=\s/, '');

    return new VariableToken(name, value);
  }

  /**
   * @private
   * @param  {Function} callback
   * @return {String}
   */
  readWhile(callback) {
    let str = '';

    while (!this.input.eof() && callback(this.input.peek())) {
      str += this.input.next();
    }

    return str;
  }

  /**
   * @private
   */
  skipComment() {
    this.readWhile(() => true);

    this.input.next();
  }
}
