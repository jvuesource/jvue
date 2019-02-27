/**
 * post.js
 *
 * @author Terwer
 * @version 1.0
 * 19-2-27 下午11:26
 **/
import { sendPost } from "./base";

/**
 * 获取文章列表
 * @returns {AxiosPromise<any>}
 */
const getPostList = () => {
  const GET_POST_LIST = "blog/post/list";
  return sendPost(GET_POST_LIST);
};

export default {
  getPostList
};
