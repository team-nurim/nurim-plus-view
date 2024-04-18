<template>

  <main>
    <div class="b-example-divider"></div>

    <div class="container">

      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <!-- identity -->
        <div class="col-md-3 mb-2 mb-md-0">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span class="fs-4">Nurim+ BI</span>
          </a>
        </div>

        <!-- menu link -->
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="#" class="nav-link px-2 link-secondary">Home</router-link></li>
          <li><router-link to="#" class="nav-link px-2">정책정보</router-link></li>
          <li><router-link to="#" class="nav-link px-2">지원금 추천</router-link></li>
          <li><router-link to="#" class="nav-link px-2">커뮤니티</router-link></li>
          <!-- <li><a href="#" class="nav-link px-2">About</a></li> -->
        </ul>

        <div class="col-md-3 text-end">
          <!-- 로그인 안했을 때 -->
          <template v-if="!loggedIn">
            <router-link to="/login" class="btn btn-outline-primary me-2" @click="goToLogin">로그인</router-link>
            <router-link to="/join" class="btn btn-primary" @click="goToJoin">회원가입</router-link>
          </template>
          <!-- 로그인했을 때 -->
          <template v-else>
            <div class="dropdown text-end">
              <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu dropdown-menu-end text-small">
                <li style="padding:0.5rem 1rem"><b>{{ member.memberNickname }}님</b></li>
                <li><hr class="dropdown-divider"></li>
                <li style="padding:0.5rem 1rem"><router-link to="/mypage" href="#">마이페이지</router-link></li>
                <li style="padding:0.5rem 1rem"><router-link to="#">계정 전환</router-link></li>
                <li style="padding:0.5rem 1rem"><router-link to="#" @click="logout">로그아웃</router-link></li>
              </ul>
            </div>
          </template>
        </div>

      </header>

    </div>   <!-- container -->

  </main>

</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'NurimHeader',
  computed: {
    ...mapGetters(['getLoggedIn']),
    memberNickname() {
      return this.member.nickname;
    }
  },
  data () {
    return {
      member: {
        memberNickname: ''
      }
    }
  },
  async created () {
    // 페이지 생성 시 로그인 상태 확인
    this.loggedIn = !!localStorage.getItem('accessToken')
    // 로그인 된 경우 회원 정보 불러오기
    if (this.loggedIn) {
      await this.fetchMemberInfo();
    }
  },
  methods: {
    async fetchMemberInfo () {
      try {
        const accessToken = localStorage.getItem('accessToken')

        const response = await axios.get('/api/v1/members/mypage', {
          headers: {
            'Authorization': 'Bearer ${accessToken}'   // 토큰 헤더에 추가
          }
        })
        this.member = response.data;
      } catch (error) {
        console.error('회원정보를 불러오지 못했습니다.', error);
      }
    },
    logout () {
      // 로그아웃 시 로컬 스토리지 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('rememberMe')
      // 로그아웃 시 헤더 상태 변경;
      this.loggedIn = false;
      // 로그아웃 후 리다이렉트
      this.$router.push('/')
    } 
  }
}
</script>

<style scoped>
</style>
