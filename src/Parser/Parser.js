'use strict';

import { Lexer, Token } from '../Lexer';

/**
 * The botlang parser for creating the abstract syntax tree.
 */
class Parser {
  /**
   * Create a Parser.
   * @param {Lexer} lexer
   * @throws {TypeError}
   */
  constructor(lexer) {
    if (!(lexer instanceof Lexer)) {
      throw new TypeError('Argument "lexer" must be an instance of type "Lexer".');
    }

    /**
     * @private
     * @type {Lexer}
     */
    this.lexer = lexer;

    /**
     * @private
     * @type {Array}
     */
    this.syntaxTree = [];

    /**
     * @private
     * @type {Integer}
     */
    this.syntaxTreeIndex = 0;
  }

  /**
   * @private
   * @return {Object|null}
   */
  getLastNode() {
    return 'undefined' !== typeof this.syntaxTree[this.syntaxTreeIndex - 1]
      ? this.syntaxTree[this.syntaxTreeIndex - 1]
      : null;
  }

  /**
   * @private
   * @param  {Token} token
   * @return {Boolean}
   */
  static isResponse(token) {
    return token instanceof Token && 'operation' === token.getType() && '-' === token.getValue();
  }

  /**
   * @private
   * @param  {Token} token
   * @return {Boolean}
   */
  static isTrigger(token) {
    return token instanceof Token && 'operation' === token.getType() && '+' === token.getValue();
  }

  /**
   * Parse input and return abstract syntax tree (AST)
   * @return {Object}
   */
  parse() {
    while (!this.lexer.eof()) {
      const token = this.lexer.next();
      if (!(token instanceof Token)) {
        continue;
      }

      if (Parser.isTrigger(token)) {
        this.pushNodeToSyntaxTree(this.parseTrigger());
      }

      if (Parser.isResponse(token) && 'trigger' === this.getLastNode().type) {
        this.getLastNode().responses.push(this.parseResponse());
      }
    }

    return {
      type : 'program',
      body : this.syntaxTree
    };
  }

  /**
   * @private
   * @return {Object}
   */
  parseTrigger() {
    const trigger = this.lexer.next();
    if ('string' !== trigger.getType()) {
      return this.lexer.inputError('Expected trigger pattern after trigger identifier.');
    }

    return {
      type      : 'trigger',
      pattern   : trigger.getValue(),
      responses : []
    };
  }

  /**
   * @private
   * @return {Object}
   */
  parseResponse() {
    const response = this.lexer.next();
    if ('string' !== response.getType()) {
      this.lexer.inputError('Expected string after response identifier.');
    }

    return {
      type  : 'response',
      value : response.getValue()
    };
  }

  /**
   * @private
   * @param  {Object} node
   * @return {void}
   */
  pushNodeToSyntaxTree(node) {
    this.syntaxTreeIndex += 1;
    this.syntaxTree.push(node);
  }
}

export default Parser;
