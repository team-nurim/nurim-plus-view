<!-- // eslint-disable-next-line
/* eslint-disable */ -->
<template>

<div class="container">

  <div class="containeradminlogin">
    <div class="row mt-2 d-flex justify-content-center">
    <h3 class="mt-3" style="font-weight: bold">관리자 로그인</h3>
    <div class="loginBox">
      <!-- <form action="/generateToken" method="post"> -->
      <form @submit.prevent="login">
        <!-- Email input -->
        <div class="form-group first">
          <label class="form-check-label">이메일 주소</label>
          <input type="email" class="form-control" v-model="memberEmail" />
        </div>

        <!-- Password input -->
        <div data-mdb-input-init class="form-outline mb-2">
          <label class="form-check-label">비밀번호</label>
          <input type="password" v-model="memberPw" class="form-control" />
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex">
            <!-- Checkbox -->
            <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="rememberMe" id="remember-me" />
            <label class="form-check-label" for="remember-me">자동로그인</label>
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <button type="button" class="btn btn-block btn-primary mb-4" @click="login">로그인</button>

        <!-- Register buttons -->
        <!-- <div class="text-center">
          <label class="form-check-label">아직 회원이 아니신가요?  <a href="/join">회원가입</a></label> -->

          <!-- Social Login -->
          <!-- <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
              <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
              <i class="fab fa-google"></i>
          </button>

          <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
              <i class="fab fa-twitter"></i>
          </button> -->
        <!-- </div> -->
      </form>
    </div>
    </div>
  </div>

</div>

</template>
<script>
// eslint-disable-next-line
/* eslint-disable */ 
import axios from 'axios'

export default {
  components: {},
  data () {
    return {
      loggedIn: false,
      memberEmail: '',
      memberPw: '',
      rememberMe: false
    }
  },
  methods: {
    async login () {
      try {
    const response = await axios.post('/generateToken', {
      memberEmail: this.memberEmail,
      memberPw: this.memberPw
    });

    // Fetch user information including role
    const memberResponse = await axios.get('/api/v1/members/mypage', {
      headers: {
        Authorization: `Bearer ${response.data.accessToken}`
      }
    });

    // Check if the user's role is 'ADMIN'
    if (memberResponse.data.memberRole !== 'ADMIN') {
      alert('관리자만 로그인할 수 있습니다.');
      return;
    }

    // Store token and proceed with login
    localStorage.setItem('accessToken', response.data.accessToken);

    // Store rememberMe status if needed
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', true);
    }
        // JWT 토큰 출력
        console.log('서버 응답 데이터:', response.data.accessToken)

        // JWT 토큰 로컬스토리지에 저장
        localStorage.setItem('accessToken', response.data.accessToken)

        // 로컬스토리지에 자동로그인 정보 저장
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', true)
        }

        this.loggedIn = true

        // 토큰과 자동로그인 정보 확인
        console.log('토큰:', localStorage.getItem('accessToken'))
        console.log('자동로그인:', localStorage.getItem('rememberMe'))
        this.$store.commit('setLoggedIn', this.loggedIn)

        // 로그인 리다이렉트 처리
        this.$router.push('/admin/post/list')
      } catch (error) {
        alert('로그인 정보를 확인해주세요.')
        console.error('로그인 실패: ', error)
      }
    }
  }
}
</script>

<style>
.containeradminlogin {
  margin: 10% 0%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginBox {
  min-width: 330px;
  max-width: 20%;
  margin: 12% auto 0;
  text-align: left;
}

.form-check-label {
  font-size: 0.8rem;
}

.btn-block {
  width: 100%;
}
</style>
