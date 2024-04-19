<template>
  <main>
    <div class="container">
      <div class="row align-items-center">
        <div class="col mb-3">
          <h4>회원 정보 수정</h4>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col mt-3 align-items-end">
          <img src="https://github.com/mdo.png" alt="mdo" width="100" height="100" class="rounded-circle">
        </div>
      </div>

      <div class="row mb-3 align-items-center">
        <div class="col mt-3 align-items-end">
          <button type="button" class="btn btn-profile">프로필 사진 수정</button>
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Email" class="form-label">이메일</label>
        <input class="form-control" type="text" id="Email" value="ssongjiaran@gmail.com" aria-label="Disabled input example" disabled readonly>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Password" class="form-label">비밀번호</label>
        <input type="password" id="Password" class="form-control" aria-describedby="passwordHelpBlock">
        <div id="passwordHelpBlock" class="form-text">
          비밀번호 자리수, 문자 숫자 등 얼마나 포함하는지 빈칸,이모지 사용 안됨.
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Nickname" class="form-label">닉네임</label>
        <input type="text" id="Nickname" class="form-control">
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-update">수정하기</button>
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

.btn-profile {
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 10px; /* 글씨크기 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
}

.btn-profile:hover, .btn-profile:focus {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: #ffdd00; /* 호버 및 포커스 시 글씨색 변경 */
}

/* .btn-menu:active {
  background-color: #004085; /* 클릭 시 배경색 */
/*  color: #ffc107; /* 클릭 시 글씨색 */
/*} */

.form-control {
  height: 50px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: start;
}

.form-label {
  margin-right: 1rem; /* 레이블과 입력 필드 사이에 공간 추가 */
  width: auto; /* 필요한 만큼 너비를 자동으로 설정 */
  flex-shrink: 0; /* 화면 크기가 줄어들 때 레이블의 크기가 줄어들지 않도록 설정 */
  font-size: 1.2rem; /* 폰트 크기 조정 */
  font-weight: bold; /* 폰트 두께 조정 */
  align-self: start; /* Flex 아이템 수직 중앙 정렬 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
}

.form-text {
  margin-right: 1rem; /* 레이블과 입력 필드 사이에 공간 추가 */
  width: auto; /* 필요한 만큼 너비를 자동으로 설정 */
  flex-shrink: 0; /* 화면 크기가 줄어들 때 레이블의 크기가 줄어들지 않도록 설정 */
  color: darkgray; /* 글씨 색*/
  align-self: start; /* Flex 아이템 수직 중앙 정렬 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
}

.btn-update {
  height: 50px;
  padding: 8;
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
}

.btn-update:hover, .btn-update:focus {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: #ffdd00; /* 호버 및 포커스 시 글씨색 변경 */
}

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
  methods: {}
}
</script>
