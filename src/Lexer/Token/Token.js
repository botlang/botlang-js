'use strict';

export default class Token {
  /**
   * Create a Token.
   * @param {String} type
   */
  constructor(type) {
    /**
     * @private
     * @type {String}
     */
    this.type = type;
  }

  /**
   * Return the token type
   * @return {String}
   */
  getType() {
    return this.type;
  }
}
