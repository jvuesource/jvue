import postApi from "../../api/post";

// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  getAllPosts({ commit }) {
    postApi
      .getPostList()
      .then(res => {
        const posts = res.data.data;
        commit("setPosts", posts);
        console.log("getPostList=>", posts);
      })
      .catch(reason => {
        console.error("getPostList request error,reason=>", reason);
      })
      .finally(() => {
        console.log("getPostList onFinally");
      });
  }
};

// mutations
const mutations = {
  setPosts(state, products) {
    state.all = products;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
