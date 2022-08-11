const assert = require('node:assert');
const {describe, it} = require('node:test');
const parseArgs = require('../src/parseArgs');

describe('parseArgs', () => {
  it('parses all arguments', () => {
    const actual = parseArgs(['error-ts/includes', '---', '{ "max_depth": 2 }']);
    const expected = ['error-ts/includes', '---', '{ "max_depth": 2 }'];
    assert.deepEqual(actual, expected);
  });

  it('parses separator from 2 arguments', () => {
    const actual = parseArgs(['error-ts/includes', '---']);
    const expected = ['error-ts/includes', '---', ''];
    assert.deepEqual(actual, expected);
  });

  it('parses TOC options from 2 arguments', () => {
    const actual = parseArgs(['error-ts/includes', '{ "max_depth": 2 }']);
    const expected = ['error-ts/includes', '', '{ "max_depth": 2 }'];
    assert.deepEqual(actual, expected);
  });
});
