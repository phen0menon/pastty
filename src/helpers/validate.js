export const isNotEmpty = value => {
  if (value.length) {
    return value && value !== undefined && value.trim() !== "";
  }

  return value ? true : false;
};
