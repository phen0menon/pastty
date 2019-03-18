export const sortByKey = (a, prop) => {
  return function (a, b) {
    return a[prop].localeCompare(b[prop]);
  };
};