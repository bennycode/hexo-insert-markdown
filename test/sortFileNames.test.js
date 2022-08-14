const assert = require('node:assert');
const {describe, it} = require('node:test');
const {sortFileNames} = require('../src/sortFileNames');

describe('sortFileNames', () => {
  it('sorts files by name', () => {
    const actual = sortFileNames([
      'B.md',
      'C.md',
      'A.md'
    ]);
    const expected = [
      'A.md',
      'B.md',
      'C.md'
    ];
    assert.deepEqual(actual, expected);
  });

  it('sorts files taking their directory name into account', () => {
    const actual = sortFileNames([
      'C:\\projects\\hexo\\source\\my-page\\includes\\A\\C.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\A\\B.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\B\\E.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\B\\D.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\C\\A.md',
    ]);
    const expected = [
      'C:\\projects\\hexo\\source\\my-page\\includes\\A\\B.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\A\\C.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\B\\D.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\B\\E.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\C\\A.md'

    ];
    assert.deepEqual(actual, expected);
  });

  it('sorts directories using numbers', () => {
    const actual = sortFileNames([
      'C:\\projects\\hexo\\source\\my-page\\includes\\TS1xxx\\TS1234.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\TS17xxx\\TS17000.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\TS2xxx\\TS2000.md',
    ]);
    const expected = [
      'C:\\projects\\hexo\\source\\my-page\\includes\\TS1xxx\\TS1234.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\TS2xxx\\TS2000.md',
      'C:\\projects\\hexo\\source\\my-page\\includes\\TS17xxx\\TS17000.md',

    ];
    assert.deepEqual(actual, expected);
  });
});
