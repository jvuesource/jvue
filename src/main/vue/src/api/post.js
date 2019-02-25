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
