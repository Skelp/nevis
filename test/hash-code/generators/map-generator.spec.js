/*
 * Copyright (C) 2017 Alasdair Mercer, !ninja
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

'use strict';

var expect = require('chai').expect;

var hashCode = require('../../../src/hash-code/index');
var HashCodeContext = require('../../../src/hash-code/context');
var HashHashCodeGenerator = require('../../../src/hash-code/generators/hash-generator');
var MapHashCodeGenerator = require('../../../src/hash-code/generators/map-generator');

describe('hash-code/generators/map-generator:MapHashCodeGenerator', function() {
  var generator;

  before(function() {
    generator = new MapHashCodeGenerator();
  });

  it('should be a HashHashCodeGenerator', function() {
    expect(generator).to.be.an.instanceof(HashHashCodeGenerator);
  });

  describe('#generate', function() {
    it('should generate hash code for map values', function() {
      expect(generator.generate(new HashCodeContext(new Map(), hashCode))).to.equal(0);
      expect(generator.generate(new HashCodeContext(new Map([
        [ 'foo', 'bar' ],
        [ 'fu', 'baz' ]
      ]), hashCode))).to.equal(156073);
    });
  });

  describe('#supports', function() {
    it('should return true for map values', function() {
      expect(generator.supports(new HashCodeContext(new Map(), hashCode))).to.be.true;
    });

    it('should return false for other values', function() {
      expect(generator.supports(new HashCodeContext(true, hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext(123, hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext('foo', hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext(function foo() {}, hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext(/foo/, hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext(new Date(), hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext([ 'foo', 'bar' ], hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext({ foo: 'bar' }, hashCode))).to.be.false;
      expect(generator.supports(new HashCodeContext(new Set(), hashCode))).to.be.false;
    });
  });
});
