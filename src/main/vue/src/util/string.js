const isEmptyOrUndefined = v => {
  return typeof v == "undefined" || v == null || v === "" || v.trim() === "";
};

export { isEmptyOrUndefined };
