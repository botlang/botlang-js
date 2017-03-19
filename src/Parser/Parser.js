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
  }

  /**
   * Parse input and return abstract syntax tree (AST)
   * @return {Object}
   */
  parse() {
    let token = this.lexer.next();

    while (token instanceof Token) {
      // Pop next token from stream
      token = this.lexer.next();
    }

    return {
      type       : 'program',
      sourceType : 'script',
      body       : this.syntaxTree
    };
  }
}

export default Parser;
