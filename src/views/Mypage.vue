<template>
  <main>
    <div class="container">
      <div class="row align-items-center">
        <div class="col mb-3">
          <h4>마이페이지</h4>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-3 mt-3 align-items-end">
          <img src="https://github.com/mdo.png" alt="mdo" width="70" height="70" class="rounded-circle">
        </div>
        <div class="col-3 align-items-start">
          <div class="">ddddd</div><br>
          <div>ddddd</div>
        </div>
        <div class="col-6 align-items-center">
          <button type="button" class="btn btn-outline-primary" @click="goForward()">회원 정보 수정</button>
        </div>
      </div>

      <hr class="custom-divider hr-sm">

      <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button type="button" class="btn btn-menu d-flex justify-content-between align-items-center">
            <span class="mx-2">내 맞춤 정보 수정</span>
            <span class="mx-2">></span>
          </button>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button type="button" class="btn btn-menu d-flex justify-content-between align-items-center">
            <span class="mx-2">계정 전환</span>
            <span class="mx-2">></span>
          </button>
      </div>

      <hr class="custom-divider hr-sm">

      <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button type="button" class="btn btn-menu d-flex justify-content-between align-items-center">
            <span class="mx-2">내가 받을 수 있는 지원금</span>
            <span class="mx-2">></span>
          </button>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button type="button" class="btn btn-menu d-flex justify-content-between align-items-center">
            <span class="mx-2">정책 정보</span>
            <span class="mx-2">></span>
          </button>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button type="button" class="btn btn-menu d-flex justify-content-between align-items-center">
            <span class="mx-2">지식 커뮤니티</span>
            <span class="mx-2">></span>
          </button>
      </div>

      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button btn-menu d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              지식 커뮤니티
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>

      <hr class="custom-divider hr-sm">

      <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button type="button" class="btn btn-menu d-flex justify-content-between align-items-center">
            <span class="mx-2">계정 탈퇴</span>
            <span class="mx-2">></span>
          </button>
      </div>

    </div>
  </main>

</template>
<style scoped>
.custom-divider {
  border: none; /* 테두리 없음 */
  height: 2px; /* 높이 조절 (원하는 높이로 변경) */
  background-color: #ccc; /* 배경색 지정 */
  margin: 20px 0; /* 위아래 여백 지정 (원하는 여백으로 변경) */
}

.custom-padding {
  padding-right: 100px;
  padding-left: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.btn-menu {
  height: 70px;
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
}

.btn-menu:hover, .btn-menu:focus {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: #ffdd00; /* 호버 및 포커스 시 글씨색 변경 */
}

/* .btn-menu:active {
  background-color: #004085; /* 클릭 시 배경색 */
/*  color: #ffc107; /* 클릭 시 글씨색 */
/*} */

</style>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      sampleData: ''
    }
  },
  props: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeUnmount () {},
  unmounted () {},
  methods: {
    goForward () {
      this.$router.push('/updateMemberInfo')
    }
  }
}
</script>
