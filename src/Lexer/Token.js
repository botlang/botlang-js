class Token {
  /**
   * Create a Token.
   * @param {String} type
   * @param {*} value
   */
  constructor(type, value) {
    /**
     * @private
     * @type {String}
     */
    this.type = type;

    /**
     * @private
     * @type {*}
     */
    this.value = value;
  }

  /**
   * Return the token type
   * @return {String}
   */
  getType() {
    return this.type;
  }

  /**
   * Return the token value
   * @return {*}
   */
  getValue() {
    return this.value;
  }
}

export default Token;
