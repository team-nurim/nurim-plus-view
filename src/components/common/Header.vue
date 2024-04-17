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
            <button type="button" class="btn btn-outline-primary me-2">Login</button>
            <button type="button" class="btn btn-primary">Sign-up</button>
          </template>
          <!-- 로그인했을 때 -->
          <template v-else>
            <div class="dropdown text-end">
              <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu dropdown-menu-end text-small">
                <li style="padding:0.5rem 1rem"><b>{{ member.nickname }}님</b></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">마이페이지</a></li>
                <li><a class="dropdown-item" href="#">계정 전환</a></li>
                <li><a class="dropdown-item" href="#">로그아웃</a></li>
              </ul>
            </div>
          </template>
        </div>

      </header>

    </div>   <!-- container -->

  </main>

  <b-button variant="danger">Button</b-button>

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

<style scoped>
</style>
