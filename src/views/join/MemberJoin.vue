<template>
  <main>

    <div class="container">
      <div class="joinBox">

        <h3>약관을 확인해주세요.</h3>

        <div class="col">
          <input type="radio" v-model="agree" id="agree-all">
          <label for="agree-all"><b>모두 동의</b></label>
        </div>

        <div class="col">
          <input type="checkbox" v-model="age" id="agree-age">
          <label for="agree-age"> (필수)만 14세 이상입니다.</label>
        </div>

        <div class="col">
          <input type="checkbox" v-model="policy" id="agree-policy">
          <label for="agree-policy"> (필수)누림 약관 및 동의사항</label>
        </div>

        <div class="col">
          <input type="checkbox" v-model="marketing" id="agree-marketing">
          <label for="agree-marketing"> (선택)마케팅 정보 수신 동의</label>
        </div>

      </div>   <!-- container end -->
    </div>

  </main>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      loggedIn: true,
      member: {
        nickname: '닉네임'
      }
    }
  },
  setup () {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeUnmount () {},
  unmounted () {},
  methods: {}
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.joinBox {
  top: 40%;
  min-width: 330px;
  max-width: 36%;
  margin: auto;
  text-align: left;
}
</style>
