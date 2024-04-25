<template>
<header>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #2C3E50;">
    <div class="container justify-content-center">
      <a href="/admin/post/list" class="navbar-brand" style="font-size: 36px; margin-bottom: 10px; color: #fff;">
        <img src="../assets/Nurim.png" height="34" style="margin-right:1.1rem;">
        <span style="font-size:1.1rem;">관리자 페이지</span></a> <!-- Increased font size and added margin-bottom -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="/admin/post/list" class="nav-link admin-link" style="margin-right: 10px; font-weight: bold;">정책정보 관리</a>
          </li>
          <li class="nav-item">
            <a href="/admin/members" class="nav-link admin-link" style="margin-right: 10px; font-weight: bold; color: #fff;">회원정보 관리</a>
          </li>
          <!-- <li class="nav-item">
            <a href="/admin/login" class="nav-link" style="margin-right: 10px;">로그아웃</a>
          </li> -->

          <!-- 로그인 안했을 때 -->
          <!-- <template v-if="!loggedIn">
            <router-link to="/login" class="btn btn-outline-primary btn-sm me-2">로그인</router-link>
            <router-link to="/join" class="btn btn-primary btn-sm">회원가입</router-link>
          </template> -->
          <!-- 로그인했을 때 -->
          <template v-if="loggedIn">
            <div class="dropdown text-end">
              <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="'https://nurimplus.s3.ap-northeast-2.amazonaws.com/images/8383f351-73fc-47c5-bf2f-b6ebc105326a.jpeg'" alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu dropdown-menu-end text-small">
                <li style="padding:0.5rem 1rem"><b>{{ member.memberNickname }}님</b></li>
                <li><hr class="dropdown-divider"></li>
                <li v-if="member.memberEmail === 'admin'" style="padding:0.5rem 1rem"><a href="/">누림플러스 홈</a></li>
                <li style="padding:0.5rem 1rem"><router-link to="#" @click="logout">로그아웃</router-link></li>
              </ul>
            </div>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</header>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderAdmin',
  computed: {
    ...mapGetters(['getLoggedIn']),
    memberNickname() {
      return this.member.memberNickname;
    }
  },
  data () {
    return {
      loggedIn: false,
      member: {
        memberNickname: '',
      }
    }
  },
  async mounted() {
    await this.checkLoggedIn(); // 마운트 후 로그인 상태 확인
    if (this.loggedIn) {
      await this.fetchMemberInfo(); // 로그인된 경우 회원 정보 가져오기
    }
  },
  async created () {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // 로그인 상태가 있을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', true)
    } else {
      // 로그인 상태가 없을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', false)
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      this.$router.push('/admin/login')
    }
    console.log('로그인 상태', this.loggedIn)
  },
  watch: {
    getLoggedIn(newValue) {
      // Vuex 상태 변경 감지
      this.loggedIn = newValue
      // 로그인 상태가 되면 회원 정보를 다시 가져옴
      if (newValue) {
        this.fetchMemberInfo()
      }
    }
  },
  methods: {
    async checkLoggedIn() {
      this.loggedIn = this.getLoggedIn;
    },
    async fetchMemberInfo () {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get('/api/v1/members/mypage', {
          headers: {
            'Authorization': `Bearer ${accessToken}`   // 토큰 헤더에 추가
          }
        })
        this.member = response.data;
      } catch (error) {
        console.error('회원정보를 불러오지 못했습니다.', error);
      }
    },
    async logout () {
      // 로그인 상태 변경
      this.loggedIn = false;

      // 로그아웃 시 로컬 스토리지 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('rememberMe')

      // Vuex 스토어의 상태 변경
      this.$store.commit('clearAccessToken');

      // 로그아웃 후 리다이렉트
      this.$router.push('/admin/login')

      console.log('로그인 상태', this.loggedIn)
    }
  }
}
</script>

<style scoped>
.admin-link {
  color: #fff !important;
}
.dropdown-toggle::after {
  border-top-color: #fff; /* 위쪽 선의 색상을 흰색으로 변경 */
}
</style>