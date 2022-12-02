import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
      userDetail: {
        username: null,
        room: "3034",
      },
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    SET_USER_DETAIL(state, data) {
      state.userDetail = data;
    },
  },

  actions: {
    setUserDetail({ commit }, userDetail) {
      commit("SET_USER_DETAIL", userDetail);
    },
  },
});

export default store;
