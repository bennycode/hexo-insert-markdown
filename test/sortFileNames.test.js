const assert = require('node:assert');
const {describe, it} = require('node:test');
const {sortFileNames} = require('../src/sortFileNames');

describe('sortFileNames', () => {
  it('sorts files by name', () => {
    const actual = sortFileNames([
      'B.md',
      'A.md'
    ]);
    const expected = [
      'A.md',
      'B.md'
    ];
    assert.deepEqual(actual, expected);
  });
});
