const path = require('path');

function sortFileName(a, b) {
  // Sort all fetched files by their filename (without taking directories into account)
  const nameA = path.parse(a).base;
  const nameB = path.parse(b).base;
  return nameA.localeCompare(nameB, undefined, {numeric: true, sensitivity: 'base'});
}

function sortFileNames(fileNames) {
  return fileNames.sort(sortFileName);
}

module.exports = {
  sortFileName,
  sortFileNames
};
