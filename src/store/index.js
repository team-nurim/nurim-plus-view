import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      accessToken: null,
      loggedIn: false // 로그인 상태
    }
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getLoggedIn: state => state.loggedIn
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    clearAccessToken (state) {
      localStorage.removeItem('accessToken')
      state.loggedIn = false
    },
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  actions: {
    saveAccessToken ({ commit }, accessToken) {
      commit('setToken', accessToken)
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('accessToken', accessToken)
    },
    clearAccessToken ({ commit }) {
      // 로컬 스토리지에서 토큰 제거
      commit('clearAccessToken')
    }
  },
  modules: {
  }
})
