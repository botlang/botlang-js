'use strict';

export default class Input {
  /**
   * Create an Input.
   * @param {String} input
   */
  constructor(input) {
    /**
     * @private
     * @type {Number}
     */
    this.column = 0;
    /**
     * @private
     * @type {String}
     */
    this.input = `${input}`;
    /**
     * @private
     * @type {Number}
     */
    this.line = 1;
    /**
     * @private
     * @type {Number}
     */
    this.position = 0;
  }

  /**
   * Determine whether or not there are no more values in the stream.
   * @return {Boolean}
   */
  eof() {
    return '' === this.peek();
  }

  /**
   * Throw a new Error.
   * @param  {String} message
   * @throws {Error}
   * @return {void}
   */
  error(message) {
    throw new Error(`${message} (Line: ${this.line}, Column: ${this.column})`);
  }

  /**
   * Return the next value from the stream.
   * @return {String}
   */
  next() {
    const character = this.input.charAt(this.position += 1);

    if ('\n' === character) {
      this.column = 0;
      this.line += 1;
    } else {
      this.column += 1;
    }

    return character;
  }

  /**
   * Return the value from the current position.
   * @return {String}
   */
  peek() {
    return this.input.charAt(this.position);
  }
}
