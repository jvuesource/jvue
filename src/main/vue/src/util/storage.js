import { getLogger } from "../util/logger";
const logger = getLogger("api/post");
import Vue from "vue";
import { isEmptyOrUndefined } from "./string";
import config from "../../jvue.config";
const {stringify} = require('flatted/cjs');

/**
 * 设置Session缓存
 * @param key key
 * @param value value
 */
const setSessionStorage = (key, value) => {
  console.log("Vue.$sessionStorage.set=>key:", key);
  console.log("Vue.$sessionStorage.set=>value:", value);
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
 * @returns string
 */
const getSessionStorageOrDefault = (key, val) => {
  const value = Vue.$sessionStorage.get(key);
  console.log("Vue.$sessionStorage.get=>key:", key);
  console.log("Vue.$sessionStorage.get=>value:", value);
  return isEmptyOrUndefined(value) ? val : value;
};

const setSession = (key, value) => {
  if (config.isSsrServer) {
    // 服务端设置Session
    logger.debug("setSession to server");
    global.setSessionCallback(key, value);
  } else {
    // 客户端存储数据
    logger.debug("setSession to $sessionStorage");
    setSessionStorage(key, value);
  }
};

const getSession = (key, val) => {
  let data = "";
  if (config.isSsrServer) {
    // 服务端获取Session
    data = global.getSessionCallback(key);
    logger.debug("getSession from server");
  } else {
    // 客户端获取数据
    // 优先获取SessionStorage，因为这里是最新更新的数据，点击客户端路由就会更新
    data = getSessionStorageOrDefault(key, "");
    logger.debug("get data from sessionStorage");
    // 没有Session取window.__INITIAL_STATE__，这里只有出发服务端渲染才会更新
    if (data.length === 0 && !isEmptyOrUndefined(window.__INITIAL_STATE__)) {
      logger.debug("get data from window.__INITIAL_STATE__");
      const initData = window.__INITIAL_STATE__[0];
      data = stringify(initData.data);
    }
  }
  logger.debug("data=>" + data);
  return data;
};

export {
  // 即将废弃
  setSessionStorage,
  // 即将废弃
  getSessionStorage,
  // 即将废弃
  getSessionStorageOrDefault,
  setSession,
  getSession
};
