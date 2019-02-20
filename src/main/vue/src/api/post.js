import axios from "axios";

// config base url
console.log("api process.env.NODE_ENV:", process.env.NODE_ENV);
const baseUrl =
  // process.env.NODE_ENV === "production"
  //   ? "http://www.terwergreen.com/jvue/api/"
  //   :
      "http://127.0.0.1:8081/api/";
console.log("baseUrl:", baseUrl);

// create http object
const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000
});

/**
 * Make a request for post list
 * @returns {*}
 */
const getPostList = () => {
  const GET_POST_LIST = "blog/post/list";
  console.log("GET_POST_LIST", GET_POST_LIST);
  return http.post(GET_POST_LIST);
};

export default {
  getPostList
};
