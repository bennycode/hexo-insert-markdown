const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const tocHelper = require('hexo/lib/plugins/helper/toc');

hexo.extend.tag.register(
  'insertmd',
  async args => {
    const renderSeparator = separator => {
      return separator ? hexo.render.renderSync({text: separator, engine: 'md'}) : '';
    };

    const renderFile = async (file, separator) => {
      const {content} = await hexo.post.render(file);
      return `${content}${renderSeparator(separator)}`;
    };

    const parseTocOptions = tocOptions => {
      if (typeof tocOptions === 'string') {
        if (tocOptions.length > 0) {
          return JSON.parse(tocOptions);
        } else {
          return {};
        }
      } else {
        return undefined;
      }
    };

    const renderHtml = async (filePath, separator) => {
      const file = path.join(hexo.source_dir, filePath);

      if (!fs.existsSync(file)) {
        throw new Error(`[${pkg.name}] Path "${file}" does not exist.`);
      }

      const isDirectory = fs.lstatSync(file).isDirectory();

      if (isDirectory) {
        const promises = fs
          .readdirSync(file)
          .map(markDownFile => `${file}${path.sep}${markDownFile}`)
          .filter(filePath => path.extname(filePath) === '.md')
          .map(filePath => renderFile(filePath));
        const contents = await Promise.all(promises);
        return contents.join(renderSeparator(separator));
      } else {
        return renderFile(file, separator);
      }
    };

    const [filePath, separator, tocOptions] = args;
    const html = await renderHtml(filePath, separator);
    const parsedTocOptions = parseTocOptions(tocOptions);
    if (parsedTocOptions) {
      const toc = tocHelper(html, parsedTocOptions);
      return toc + html;
    } else {
      return html;
    }
  },
  {async: true}
);
