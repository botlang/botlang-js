'use strict';

import Token from './Token';

export default class ResponseToken extends Token {
  /**
   * Create a ResponseToken.
   * @param {String} value
   */
  constructor(value) {
    super('resp');

    /**
     * @private
     * @type {String}
     */
    this.value = value;
  }

  /**
   * Return the token value
   * @return {String}
   */
  getValue() {
    return this.value;
  }
}
