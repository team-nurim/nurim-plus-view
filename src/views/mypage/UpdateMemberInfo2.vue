<template>
  <main>
    <div class="container">
      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4>내 맞춤 정보 수정</h4>
        </div>
      </div>

      <!-- 내 맞춤 정보 수정 -->
      <!-- 이름 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Nickname" class="form-label">성함(닉네임,,?)</label>
        <div class="row">
          <input class="form-control" type="text" id="Nickname" v-bind:value="member.memberNickname" aria-label="Disabled input example" disabled readonly>
        </div>
      </div>

      <!-- 성별 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Gender" class="form-label">성별</label>
        <div class="row" id="Gender">
          <div class="col">
            <button type="button" class="btn btn-update" :class="{'active': activeGender === 0 }" @click="setGender(0)">
              남성
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-update" :class="{'active': activeGender === 1 }" @click="setGender(1)">
              여성
            </button>
          </div>
        </div>
      </div>

      <!-- 연령대 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Age" class="form-label">연령대</label>
        <div class="row">
          <div class="accordion" id="Age">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  본인의 연령을 선택해주세요.
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="text-align: left;">
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setAge(20)">20대</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setAge(30)">30대</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setAge(40)">40대</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setAge(100)">기타</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 거주지 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Residence" class="form-label">거주지</label>
        <div class="row">
          <label for="postcode" class="form-label">우편번호</label>
          <input type="text" id="postcode" v-model="postcode" placeholder="우편번호">
          <button type="button" class="btn btn-update" @click="execDaumPostcode">우편번호 찾기</button>
        </div>
        <div class="row align-items-center custom-padding">
          <label for="address" class="form-label">주소</label>
          <input type="text" id="address" v-model="address" placeholder="주소" readonly>
        </div>
        <div class="row align-items-center custom-padding">
          <label for="detailAddress" class="form-label">상세주소</label>
          <input type="text" id="detailAddress" v-model="detailAddress" placeholder="상세주소">
        </div>
      </div>

      <!-- 결혼 여부 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Gender" class="form-label">결혼 여부</label>
        <div class="row" id="Gender">
          <div class="col">
            <button type="button" class="btn btn-update" @click="setMarriage(1)">기혼</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-update" @click="setMarriage(0)">미혼</button>
          </div>
        </div>
      </div>

      <!-- 연간 소득 수준 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Income" class="form-label">연간 소득 수준</label>
        <div class="row">
          <div class="accordion" id="Income">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  본인의 소득구간를 선택해주세요.
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="text-align: left;">
                  <a class="dropdown-item mt-3 mb-3" href="#"  @click="setIncome('기초/차상위')">기초/차상위</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('1구간')">1구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('2구간')">2구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('3구간')">3구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('4구간')">4구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('5구간')">5구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('6구간')">6구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('7구간')">7구간</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="setIncome('8구간')">8구간</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-update" @click="updateMemberInfo">입력하기</button>
      </div>

    </div>
  </main>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'UpdateMemberInfo',
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
        memberId: 0,
        memberEmail: '',
        memberPw: '',
        memberNickname: '',
        memberAge: '',
        gender: false,
        memberResidence: '',
        memberMarriage: false,
        memberIncome: '',
        type: false,
        memberProfileImage: '',
        expertFile: ''
      },
      accordionId: 'Residence', // 아코디언의 부모 요소 ID
      collapseOne: 'collapseOne', // 첫 번째 아코디언의 collapse ID
      collapseTwo: 'collapseTwo', // 두 번째 아코디언의 collapse ID
      selectedRegion: '', // 선택한 도/특별시/광역시
      selectedDistricts: [], // 선택한 시/군/구 목록
      postcode: '',
      address: '',
      detailAddress: '',
      activeGender: null // 현재 선택된 성별을 나타내는 상태 변수
    }
  },
  async created () {
    const accessToken = localStorage.getItem('accessToken')

    // 페이지 생성 시 로그인 상태 확인
    if(accessToken != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    console.log('저장된 토큰: ' + accessToken)
    console.log('로그인 여부: ' + this.loggedIn)
    // 로그인 된 경우 회원 정보 불러오기
    if (this.loggedIn) {
      await this.fetchMemberInfo();
    }
  },
  mounted() {
    this.fetchMemberInfo();
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);
  },
  methods: {
    async fetchMemberInfo () {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get(`/api/v1/members/mypage`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`   // 토큰 헤더에 추가
          }
        })
        // API 응답에 필요한 데이터 member에 할당
        this.member = response.data;
      } catch (error) {
        console.error('회원정보를 불러오지 못했습니다.', error);
      }
    },
    async updateMemberInfo() {
      try {
        const memberId = this.member.memberId;
        const updateData = {
          gender: this.member.gender,
          memberAge: this.member.memberAge,
          memberResidence: this.address + ', ' + this.detailAddress,
          memberMarriage: this.member.memberMarriage,
          memberIncome: this.member.memberIncome
        };
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`api/v1/members/memberInfo/${memberId}`, updateData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`
          }
        });
        console.log('회원 정보 수정 성공: ', response.data);
        alert('회원 정보가 성공적으로 수정되었습니다.');
      } catch (error) {
        console.log('회원 정보 수정 실패: ', error)
        alert('회원 정보 수정에 실패했습니다.');
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
    },
    execDaumPostcode() {
      new daum.Postcode({
        oncomplete: data => {
          this.postcode = data.zonecode;
          this.address = data.address;
        },
      }).open();
    },
    setGender(gender) {
      this.member.gender = gender;
      // 현재 선택된 성별을 업데이트
      this.activeGender = gender;
    },
    setMarriage(memberMarriage) {
      this.member.memberMarriage = memberMarriage;
    },
    setIncome(memberIncome) {
      this.member.memberIncome = memberIncome;
    },
    setAge(memberAge) {
      this.member.memberAge = memberAge;
    }
  }
}
</script>

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
  width: 100%;
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

.accordion-collapse {
  max-height: 168px;
  overflow-y: auto;
}

</style>
