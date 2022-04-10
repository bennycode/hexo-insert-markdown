function parseTocOptions(tocOptions = '') {
  if (tocOptions.length > 0) {
    return JSON.parse(tocOptions);
  } else {
    return undefined;
  }
}

module.exports = parseTocOptions;
