const pkg = require('../package.json');
const path = require('path');
const fs = require('fs');

function renderSeparator(hexo, separator) {
  return separator ? hexo.render.renderSync({text: separator, engine: 'md'}) : '';
}

async function renderFile(hexo, file, separator) {
  const {content} = await hexo.post.render(file);
  return `${content}${renderSeparator(hexo, separator)}`;
}

async function renderHtml(hexo, filePath, separator) {
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
      .map(filePath => renderFile(hexo, filePath));
    const contents = await Promise.all(promises);
    return contents.join(renderSeparator(hexo, separator));
  } else {
    return renderFile(hexo, file, separator);
  }
}

module.exports = renderHtml;
