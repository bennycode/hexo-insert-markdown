const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

hexo.extend.tag.register('insertmd', function(args){
  const [filePath] = args;
  const file = path.join(hexo.source_dir, filePath);

  if (!fs.existsSync(file)) {
    throw new Error(`[${pkg.name}] File "${file}" does not exist.`);
  }

  return hexo.render.renderSync({
    path: file
  });
});
