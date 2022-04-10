const tocHelper = require('hexo/lib/plugins/helper/toc');
const parseTocOptions = require('./parseTocOptions');
const renderHtml = require('./renderHtml');
const parseArgs = require('./parseArgs');

hexo.extend.tag.register(
  'insertmd',
  async args => {
    const [filePath, separator, tocOptions] = parseArgs(args);
    const html = await renderHtml(hexo, filePath, separator);
    const parsedTocOptions = parseTocOptions(tocOptions);
    if (parsedTocOptions) {
      const toc = tocHelper(html, parsedTocOptions);
      return `${toc}${html}`;
    } else {
      return html;
    }
  },
  {async: true}
);
