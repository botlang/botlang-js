'use strict';

import Token from './Token';

export default class VariableToken extends Token {
  /**
   * Create a VariableToken.
   * @param {String} name
   * @param {String} value
   */
  constructor(name, value) {
    super('var');

    /**
     * @private
     * @type {String}
     */
    this.name = name;

    /**
     * @private
     * @type {String}
     */
    this.value = value;
  }

  /**
   * Return the variable name
   * @return {String}
   */
  getName() {
    return this.name;
  }

  /**
   * Return the token value
   * @return {String}
   */
  getValue() {
    return this.value;
  }
}
