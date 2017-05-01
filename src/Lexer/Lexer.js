'use strict';

import Input from './Input';
import reservedKeywords from '../../lang/ReservedKeywords.json';
import Token from './Token';

/**
 * The botlang lexer takes an instance of `Input` as a constructor argument and produces
 * a token stream for further processing in the parser.
 */
class Lexer {
  /**
   * Create a Lexer.
   * @param {Input} input
   * @throws {TypeError}
   * @return {void}
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
  }

  /**
   * Determine whether or not the lexer has reached the input's eof
   * @return {Boolean}
   */
  eof() {
    return this.input.eof();
  }

  /**
   * Throw a new Error.
   * @param  {String} message
   * @throws {Error}
   * @return {void}
   */
  inputError(message) {
    this.input.error(message);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isDigit(char) {
    return /[0-9]/.test(char);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isIdentifier(char) {
    return Lexer.isIdentifierStart(char) || /[a-zA-Z_]/.test(char);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isIdentifierStart(char) {
    return /[a-zA-Z]/.test(char);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isOperation(char) {
    return -1 !== '+-*/%=&|<>!'.indexOf(char);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isPunctuation(char) {
    return -1 !== ',;(){}[]'.indexOf(char);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isReservedKeyword(char) {
    return -1 !== reservedKeywords.indexOf(char);
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isString(char) {
    return '"' === char;
  }

  /**
   * @private
   * @param {String} char
   * @return {Boolean}
   */
  static isWhitespace(char) {
    return /\s/.test(char);
  }

  /**
   * Return the next token in from the input stream or `null` if the end of file has been reached
   * @return {Token|null}
   */
  next() {
    const token = this.currentToken;
    this.currentToken = null;

    return token || this.nextToken();
  }

  /**
   * @private
   * @return {Token|null}
   */
  nextToken() {
    // Ignore whitespace
    this.readWhile(Lexer.isWhitespace);

    // Return if is end of stream
    if (this.input.eof()) {
      return null;
    }

    // Get the current character
    const char = this.input.peek();

    // Ignore comments
    if ('#' === char) {
      this.skipComment();
      return this.nextToken();
    }

    // Read string
    if (Lexer.isString(char)) {
      return this.readString();
    }

    // Read number
    if (Lexer.isDigit(char)) {
      return this.readNumber();
    }

    // Read identifier
    if (Lexer.isIdentifierStart(char)) {
      return this.readIdentifier();
    }

    // Read operation
    if (Lexer.isOperation(char)) {
      return this.readOperation();
    }

    // Read punctuation
    if (Lexer.isPunctuation(char)) {
      return this.readPunctuation();
    }

    return this.inputError('Invalid character');
  }

  /**
   * Return the current token or get the first token if `next` has not been called yet.
   * @return {Token}
   */
  peek() {
    return this.currentToken || this.next();
  }

  /**
   * @private
   * @return {String}
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
        this.input.next();
        break;
      } else {
        str += char;
      }
    }

    return str;
  }

  /**
   * @private
   * @return {Token}
   */
  readIdentifier() {
    const identifier = this.input.peek().concat(
      this.readWhile(char => Lexer.isIdentifier(char))
    ).trim();

    return new Token(
      Lexer.isReservedKeyword(identifier) ? 'keyword' : 'identifier',
      identifier
    );
  }

  /**
   * @private
   * @return {Token}
   */
  readNumber() {
    let isDecimal = false;

    const number = this.input.peek().concat(this.readWhile((char) => {
      if ('.' === char) {
        if (isDecimal) {
          return false;
        }
        isDecimal = true;
        return true;
      }
      return Lexer.isDigit(char);
    })).trim();

    return new Token('numeric', parseFloat(number));
  }

  /**
   * @private
   * @return {Token}
   */
  readOperation() {
    return new Token(
      'operation',
      this.input.peek().concat(this.readWhile(char => Lexer.isOperation(char))).trim()
    );
  }

  /**
   * @private
   * @return {Token}
   */
  readPunctuation() {
    return new Token('punctuator', this.input.peek());
  }

  /**
   * @private
   * @return {Token}
   */
  readString() {
    return new Token('string', this.readEscaped('"'));
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
    this.readWhile(char => '\n' !== char);

    this.input.next();
  }
}

export default Lexer;
