const filterList = (list, excluded) => {
  if (Array.isArray(excluded)) {
    return list.filter((elem) => !excluded.includes(elem));
  } else {
    return list.filter((elem) => elem !== excluded);
  }
};

module.exports = filterList;
