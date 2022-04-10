/**
 * Function to guarantee the order of arguments because Hexo skips empty string arguments.
 *
 * @param {string[]} args - Tag plugin arguments parsed by Hexo
 * @returns {string[]} Guaranteed order of arguments ([filePath, separator, tocOptions])
 */
function parseArgs(args) {
  if (args.length === 2) {
    const [filePath, separatorOrToc] = args;
    try {
      // TOC is in JSON format so we can validate that
      JSON.parse(separatorOrToc);
      return [filePath, '', separatorOrToc];
    } catch (error) {
      return [filePath, separatorOrToc, ''];
    }
  }
  return args;
}

module.exports = parseArgs;
