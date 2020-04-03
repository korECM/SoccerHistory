const checkDate = (date: string) => {
  let dayRegExp = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
  if (dayRegExp.test(date)) return true;
  return false;
};
export { checkDate };
