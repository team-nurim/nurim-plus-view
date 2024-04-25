import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      accessToken: null,
      loggedIn: false, // 로그인 상태
      memberEmail: null, // 로그인한 사용자의 이메일
    };
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
    getLoggedIn: (state) => state.loggedIn,
    getMemberEmail: (state) => state.memberEmail,
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    clearAccessToken(state) {
      localStorage.removeItem("accessToken");
      state.loggedIn = false;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setMemberEmail(state, memberEmail) {
      state.memberEmail = memberEmail;
    },
  },
  actions: {
    saveAccessToken({ commit }, accessToken, memberEmail) {
      commit("setToken", accessToken);
      commit("setMemberEmail", memberEmail);
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
    },
    clearAccessToken({ commit }) {
      // 로컬 스토리지에서 토큰 제거
      commit("clearAccessToken");
      commit("setMemberEmail", null);
    },
  },
  modules: {},
});
