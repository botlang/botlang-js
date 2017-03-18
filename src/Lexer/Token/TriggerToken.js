'use strict';

import Token from './Token';

export default class TriggerToken extends Token {
  /**
   * Create a TriggerToken.
   * @param {String} value
   */
  constructor(value) {
    super('trig');

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
