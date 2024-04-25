import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      accessToken: null,
      loggedIn: false, // 로그인 상태
      memberEmail: null, //로그인한 사용자의 이메일
      agreed: false,
      applied: false, // 계정 전환 신청 상태
    }
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getLoggedIn: state => state.loggedIn,
    getMemberEmail: state => state.memberEmail,
    getAgreed: state => state.agreed,
    getApplied: state => state.applied,
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
    },
    setMemberEmail (state, memberEmail){
      state.memberEmail = memberEmail
    },
    setApplied(state, applied) {
      state.applied = applied
      localStorage.setItem('applied', applied)
    },
    setAgreed (state, agreed) {
      state.agreed = agreed
      localStorage.setItem('agreed', agreed)
    }
  },
  actions: {
    saveAccessToken ({ commit }, accessToken, memberEmail) {
      commit('setToken', accessToken)
      commit('setMemberEmail', memberEmail)
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('accessToken', accessToken)
    },
    clearAccessToken ({ commit }) {
      // 로컬 스토리지에서 토큰 제거
      commit('clearAccessToken')
      commit('setMemberEmail', null)
    },
      // 약관 동의 상태 설정 액션
    setAgreed({ commit }, agreed) {
      commit('setAgreed', agreed);
    },
    // 계정 전환 상태 설정 액션
    setApplied({ commit }, applied) {
      commit('setApplied', applied);
    },

  },
  modules: {
  }
})
