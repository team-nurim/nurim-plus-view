import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      accessToken: null
    }
  },
  getters: {
    getAccessToken: state => state.accessToken
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    clearAccessToken (state) {
      state.accessToken = null
    }
  },
  actions: {
    saveAccessToken ({ commit }, token) {
      commit('setToken', token)
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('accessToken', token)
    },
    clearAccessToken ({ commit }) {
      commit('clearToken')
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('accessToken')
    }
  },
  modules: {
  }
})
