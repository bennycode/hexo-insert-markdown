const assert = require('assert');
const parseArgs = require('../src/parseArgs');

assert.deepEqual(
  parseArgs(['error-ts/includes', '---', '{ "max_depth": 2 }']),
  ['error-ts/includes', '---', '{ "max_depth": 2 }'],
  'Parse all arguments'
);

assert.deepEqual(
  parseArgs(['error-ts/includes', '---']),
  ['error-ts/includes', '---', ''],
  'Parse separator from 2 arguments'
);

assert.deepEqual(
  parseArgs(['error-ts/includes', '{ "max_depth": 2 }']),
  ['error-ts/includes', '', '{ "max_depth": 2 }'],
  'Parse TOC options from 2 arguments'
);
