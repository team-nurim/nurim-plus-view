<template>

  <main class="border-bottom">
    <div class="b-example-divider"></div>

    <div class="container">

      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-1">
        <!-- identity -->
        <div class="col-md-3 mb-2 mb-md-0">
          <router-link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span class="fs-4">Nurim+ BI</span>
          </router-link>
        </div>

        <!-- menu link -->
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/policy" class="nav-link px-3">정책정보</router-link></li>
          <li><router-link to="/recommend-main" class="nav-link px-3">나를 위한 정책지원</router-link></li>
          <li><router-link to="/community" class="nav-link px-3">커뮤니티</router-link></li>
          <!-- <li><a href="#" class="nav-link px-2">About</a></li> -->
        </ul>

        <div class="col-md-3 text-end">
          <!-- 로그인 안했을 때 -->
          <template v-if="!loggedIn">
            <router-link to="/login" class="btn btn-outline-primary btn-sm me-2">로그인</router-link>
            <router-link to="/join" class="btn btn-primary btn-sm">회원가입</router-link>
          </template>
          <!-- 로그인했을 때 -->
          <template v-else>
            <div class="dropdown text-end">
              <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src=member.memberProfileImage alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu dropdown-menu-end text-small">
                <li style="padding:0.5rem 1rem"><b>{{ member.memberNickname }}님</b></li>
                <li><hr class="dropdown-divider"></li>
                <!-- memberEmail이 admin일 경우 다르게 드롭다운 표시 -->
                <li v-if="member.memberEmail === 'admin'" style="padding:0.5rem 1rem"><router-link to="/admin/post/list">관리자 페이지</router-link></li>
                <li v-if="member.memberEmail !== 'admin'" style="padding:0.5rem 1rem"><router-link to="/mypage" href="#">마이페이지</router-link></li>
                <li v-if="member.memberEmail !== 'admin'" style="padding:0.5rem 1rem"><router-link to="#">계정 전환</router-link></li>
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
  async created () {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // 로그인 상태가 있을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', true)
    } else {
      // 로그인 상태가 없을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', false)
    }
  },
  async mounted () {
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
      this.$router.push('/')

      console.log('로그인 상태', this.loggedIn)
    }
  }
}
</script>

<style>
.nav-link {
  color: #333 !important;
  text-decoration: none;
}

.nav-link.active {
  font-weight: 700 !important;
}
</style>