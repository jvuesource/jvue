const isEmptyOrUndefined = v => {
  return (
    typeof v == "undefined" ||
    v == null ||
    (typeof v == "string" && (v === "" || v.trim() === ""))
  );
};

export { isEmptyOrUndefined };
