const pkg = require('../package.json');
const path = require('path');
const fs = require('fs');
const {sortFileName} = require("./sortFileNames");
const {readdir} = require('fs').promises;

function renderSeparator(hexo, separator) {
  return separator ? hexo.render.renderSync({text: separator, engine: 'md'}) : '';
}

async function renderFile(hexo, file, separator) {
  const {content} = await hexo.post.render(file);
  return `${content}${renderSeparator(hexo, separator)}`;
}

/** @see https://stackoverflow.com/a/45130990/451634 */
async function* getFiles(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function renderHtml(hexo, filePath, separator) {
  const file = path.join(hexo.source_dir, filePath);

  if (!fs.existsSync(file)) {
    throw new Error(`[${pkg.name}] Path "${file}" does not exist.`);
  }

  const isDirectory = fs.lstatSync(file).isDirectory();

  if (isDirectory) {
    const files = [];

    // Recursively fetch files from parent directory and subdirectories
    for await (const fileInDirectory of getFiles(file)) {
      files.push(fileInDirectory);
    }

    const promises = files
      .filter(filePath => path.extname(filePath) === '.md')
      .sort(sortFileName)
      .map(filePath => renderFile(hexo, filePath));
    const contents = await Promise.all(promises);
    return contents.join(renderSeparator(hexo, separator));
  } else {
    return renderFile(hexo, file, separator);
  }
}

module.exports = renderHtml;
