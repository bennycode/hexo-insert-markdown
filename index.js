const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

hexo.extend.tag.register(
  'insertmd',
  async args => {
    const [filePath, separator] = args;
    const file = path.join(hexo.source_dir, filePath);

    if (!fs.existsSync(file)) {
      throw new Error(`[${pkg.name}] File "${file}" does not exist.`);
    }

    const {content} = await hexo.post.render(file);
    return separator ? content + hexo.render.renderSync({text: separator, engine: 'md'}) : content;
  },
  {async: true}
);
