import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      accessToken: null,
      loggedIn: false, // 로그인 상태
      member: {}, // 회원 정보
      agreed: false,
      applied: false, // 계정 전환 신청 상태
    }
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getLoggedIn: state => state.loggedIn,
    getMemberInfo: state => state.member,
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
    setMemberInfo (state, member) {
      state.member = member
    },
    setApplied(state, applied) {
      state.applied = applied
      localStorage.setItem('applied', applied)
    },
    setAgreed (state, agreed) {
      state.agreed = agreed
      localStorage.setItem('agreed', agreed)
    },
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
    },
    // 약관 동의 상태 설정 액션
    setAgreed({ commit }, agreed) {
      commit('setAgreed', agreed);
    },
    // 계정 전환 상태 설정 액션
    setApplied({ commit }, applied) {
      commit('setApplied', applied);
    },
    fetchMemberInfo ({ commit, state }) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = axios.get(`/api/v1/members/mypage`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`   // 토큰 헤더에 추가
          }
        })
        // API 응답에 필요한 데이터 member에 할당
        commit('setMemberInfo', response.data);
      } catch (error) {
        console.error('회원정보를 불러오지 못했습니다.', error);
      }
    }
  },
  modules: {
  }
})
