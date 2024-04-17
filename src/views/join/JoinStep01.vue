<template>
<!-- // eslint-disable-next-line
/* eslint-disable */ -->
  <main>
    <div class="container">
      <!-- 1단계 -->
      <div class="joinBox" v-if="currentStep === 1">
        <h3>약관에 동의해주세요.</h3>

        <div class="col">
          <input type="checkbox" v-model="agree" id="agree-all" />
          <label for="agree-all" class="form-check-label"><b>모두 동의</b></label>
        </div>

        <div class="col">
          <input type="checkbox" v-model="age" id="agree-age" />
          <label for="agree-age" class="form-check-label"> [필수] 만 14세 이상입니다. </label>
          <router-link to="#"><span>보기</span></router-link>
        </div>

        <div class="col">
          <input type="checkbox" v-model="policy" id="agree-policy" />
          <label for="agree-policy" class="form-check-label"> [필수] 누림 약관 및 동의사항 </label>
          <router-link to="#"><span>보기</span></router-link>
        </div>

        <div class="col">
          <button type="button" class="btn btn-primary" onclick="goNextStep">동의하고 가입하기</button>
        </div>
      </div>

      <!-- 2단계 -->
      <div class="joinBox" v-if="currentStep === 2">
        <h3>로그인에 사용할 아이디와 비밀번호, 닉네임을 입력해주세요.</h3>

        <div class="col">
          <button type="button" class="btn btn-primary" onclick="goNextStep">
            동의하고 가입하기
          </button>
        </div>
      </div>

      <!-- 3단계 -->
      <div class="joinBox" v-if="currentStep === 3">
        <h3>로그인에 사용할 아이디와 비밀번호, 닉네임을 입력해주세요.</h3>

        <div class="col">
          <button type="button" class="btn btn-primary" onclick="goNextStep">
            동의하고 가입하기
          </button>
        </div>
      </div>
    </div>
    <!-- container end -->
  </main>
</template>

<script>z
// eslint-disable-next-line
/* eslint-disable */
export default {
  name: '',
  components: {},
  data () {
    return {
      loggedIn: true,
      agreeAll: false,
      policy: false,
      marketing: false,
      currentStep: 1,
      enableSubmit: false
    }
  },
  methods: {
    goNextStep () {
      this.currentStep++
    }
  }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.joinBox {
  min-width: 330px;
  max-width: 30%;
  margin: auto;
  text-align: left;
}
.form-check-label {
  font-size: 0.8rem;
}
.span {
  font-size: 0.8rem;
}
</style>
