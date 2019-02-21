import Vue from "vue";
import { isEmptyOrUndefined } from "./string";

/**
 * 设置Session缓存
 * @param key key
 * @param value value
 */
const setSessionStorage = (key, value) => {
  console.log("Vue.$sessionStorage.set=>key:", key);
  console.log("Vue.$sessionStorage.set=>value:", eval(value));
  Vue.$sessionStorage.set(key, value);
};

/**
 * 获取Session缓存
 * @param key key
 * @returns {*}
 */
const getSessionStorage = key => {
  return getSessionStorageOrDefault(key, "");
};

/**
 * 获取Session缓存带默认值
 * @param key
 * @param val
 * @returns {*}
 */
const getSessionStorageOrDefault = (key, val) => {
  const value = Vue.$sessionStorage.get(key);
  console.log("Vue.$sessionStorage.get=>key:", key);
  console.log("Vue.$sessionStorage.get=>value:", eval(value));
  return isEmptyOrUndefined(value) ? val : value;
};

export { setSessionStorage, getSessionStorage, getSessionStorageOrDefault };
