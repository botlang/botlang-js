'use strict';

import { Input, Lexer } from './Lexer';
import Parser from './Parser';

/**
 * Botlnag interpreter.
 */
class Botlang {
  /**
   * Create a new Botlang interpreter.
   * @param {String} brain
   */
  constructor(brain) {
    const input = new Input(brain),
          lexer = new Lexer(input),
          parser = new Parser(lexer);

    /**
     * @private
     * @type {Object}
     */
    this.program = parser.parse();
  }

  /**
   * @private
   * @param {String} trigger
   * @param {Object} node
   * @type {String}
   */
  static evalTriggerNode(trigger, node) {
    if (0 === node.responses.length) return null;

    return node.responses[Math.floor(Math.random() * node.responses.length)].value;
  }

  /**
   * @private
   * @type {Object}
   */
  match(message) {
    let res = null;

    this.program.body.forEach((el) => {
      if ('trigger' === el.type && new RegExp(el.pattern, 'i').test(message)) res = Botlang.evalTriggerNode(message, el);
    });

    return res || 'Sorry, I do not know the answer to that question.';
  }

  /**
   * Returns a reply to a given message accordingly to the defined brain.
   * @return {String}
   */
  reply(message) {
    return this.match(message);
  }
}

export default Botlang;
