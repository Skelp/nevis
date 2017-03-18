/*
 * Copyright (C) 2017 Alasdair Mercer, Skelp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

var HashEqualsComparator = require('./hash-comparator')

/**
 * An implementation of {@link HashEqualsComparator} that supports plain old object values.
 *
 * @protected
 * @constructor
 * @extends HashEqualsComparator
 */
var ObjectEqualsComparator = HashEqualsComparator.extend({

  /**
   * @inheritdoc
   * @override
   * @memberof ObjectEqualsComparator#
   */
  getKeys: function getKeys(hash, context) {
    var keys = []
    var options = context.options
    var value

    for (var key in hash) {
      if (!options.ignoreInherited || Object.prototype.hasOwnProperty.call(hash, key)) {
        value = this.getValue(hash, key, context)

        if ((typeof value !== 'function' || !options.ignoreMethods) && options.filterProperty(key, value, hash)) {
          keys.push(key)
        }
      }
    }

    return keys
  },

  /**
   * @inheritdoc
   * @override
   * @memberof ObjectEqualsComparator#
   */
  getValue: function getValue(hash, key) {
    return hash[key]
  },

  /**
   * @inheritdoc
   * @override
   * @memberof ObjectEqualsComparator#
   */
  supports: function supports(context) {
    return context.type === 'object'
  }

})

module.exports = ObjectEqualsComparator
