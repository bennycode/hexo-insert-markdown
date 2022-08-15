function sortFileName(a, b) {
  // Sort all fetched files by their filename (without taking directories into account)
  const nameA = a;
  const nameB = b;
  return nameA.localeCompare(nameB, undefined, {numeric: true, sensitivity: 'base'});
}

function sortFileNames(fileNames) {
  return fileNames.sort(sortFileName);
}

module.exports = {
  sortFileName,
  sortFileNames
};
