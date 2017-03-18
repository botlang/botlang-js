'use strict';

/**
 * The botlang parser
 */
class Parser {
  /**
   * Create a Parser.
   * @param {Token[]} token
   */
  constructor(token) {
    if (!Array.isArray(token)) {
      throw new TypeError('Argument "token" must be an instance of "Array".');
    }

    /**
     * @private
     * @type {Token[]}
     */
    this.token = token;
  }
}

export default Parser;
