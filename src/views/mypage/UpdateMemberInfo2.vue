<template>
  <main style="background-color: #FAFBFC;">
    <div class="container mt-3 mb-4">
      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4 style="font-weight: 700; font-size: 28px;">내 맞춤 정보 수정</h4>
        </div>
      </div>

      <!-- 내 맞춤 정보 수정 -->
      <!-- 닉네임 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Nickname" class="form-label">닉네임</label>
        <div class="row">
          <input class="mt-3 mb-3 form-control" type="text" id="Nickname" v-bind:value="member.memberNickname" aria-label="Disabled input example" disabled readonly>
        </div>
      </div>

      <!-- 성별 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Gender" class="form-label">성별</label>
        <div class="row" id="Gender">
          <div class="col">
            <input type="radio" id="male" name="gender" class="btn-select select" @click="setGender(0)">
            <label class="btn btn-choice" for="male">남성</label>
          </div>
          <div class="col">
            <input type="radio" id="female" name="gender" class="btn-select select" @click="setGender(1)">
            <label class="btn btn-choice" for="female">여성</label>
          </div>
        </div>
      </div>

      <!-- 연령대 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Age" class="form-label">연령대</label>
        <div class="row mt-3 mb-3 ">
          <div class="accordion" id="Age">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  본인의 연령을 선택해주세요.
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="text-align: left;">
                  <input type="radio" class="btn-check" id="20" name="age" @click="setAge(20)">
                  <label class="btn btn-income" for="20">20대</label>
                  <input type="radio" class="btn-check" id="30" name="age" @click="setAge(30)">
                  <label class="btn btn-income" for="30">30대</label>
                  <input type="radio" class="btn-check" id="40" name="age" @click="setAge(40)">
                  <label class="btn btn-income" for="40">40대</label>
                  <input type="radio" class="btn-check" id="etc" name="age" @click="setAge(99)">
                  <label class="btn btn-income" for="etc">기타</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 거주지 -->
      <div class="row mt-3 mb-10 align-items-center address-padding">
          <label for="postcode" class="form-label">우편번호</label>
          <input type="text" class="mt-3 mb-3 form-control" id="postcode" v-model="postcode" placeholder="우편번호">
          <button type="button" class="btn btn-address mb-4" @click="execDaumPostcode">우편번호 찾기</button>
          <label for="address" class="form-label">상세주소</label>
          <input type="text" class="mt-3 mb-3 form-control" id="address" v-model="address" placeholder="주소" readonly>
          <input type="text" class="mb-3 form-control" id="address" v-model="detailAddress" placeholder="상세주소">
      </div>

      <!-- 결혼 여부 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Marriage" class="form-label">결혼 여부</label>
        <div class="row" id="Marriage">
          <div class="col">
            <input type="radio" id="married" name="marriage" class="btn-select select" @click="setMarriage(1)">
            <label class="btn btn-choice" for="married">기혼</label>
          </div>
          <div class="col">
            <input type="radio" id="unmarried" name="marriage" class="btn-select select" @click="setMarriage(0)">
            <label class="btn btn-choice" for="unmarried">미혼</label>
          </div>
        </div>
      </div>

      <!-- 연간 소득 수준 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Income" class="form-label">연간 소득 수준</label>
        <div class="row mt-3 mb-3">
          <div class="accordion" id="Income">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  본인의 소득구간를 선택해주세요.
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="text-align: left;">
                  <input type="radio" class="btn-check" id="0" name="income" @click="setIncome('기초/차상위')">
                  <label class="btn btn-income" for="0">기초/차상위</label>
                  <input type="radio" class="btn-check" id="1" name="income" @click="setIncome('1구간')">
                  <label class="btn btn-income" for="1">1구간</label>
                  <input type="radio" class="btn-check" id="2" name="income" @click="setIncome('2구간')">
                  <label class="btn btn-income" for="2">2구간</label>
                  <input type="radio" class="btn-check" id="3" name="income" @click="setIncome('3구간')">
                  <label class="btn btn-income" for="3">3구간</label>
                  <input type="radio" class="btn-check" id="4" name="income" @click="setIncome('4구간')">
                  <label class="btn btn-income" for="4">4구간</label>
                  <input type="radio" class="btn-check" id="5" name="income" @click="setIncome('5구간')">
                  <label class="btn btn-income" for="5">5구간</label>
                  <input type="radio" class="btn-check" id="6" name="income" @click="setIncome('6구간')">
                  <label class="btn btn-income" for="6">6구간</label>
                  <input type="radio" class="btn-check" id="7" name="income" @click="setIncome('7구간')">
                  <label class="btn btn-income" for="7">7구간</label>
                  <input type="radio" class="btn-check" id="8" name="income" @click="setIncome('8구간')">
                  <label class="btn btn-income" for="8">8구간</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <!-- <button type="button" class="btn btn-update" @click="updateMemberInfo">입력하기</button> -->
        <button type="button" class="mt-3 mb-3 btn btn-update" data-bs-toggle="modal" data-bs-target="#exampleModal">
          수정하기
        </button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-weight: 600;">내 맞춤 정보 수정</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p style="font-size: 20px;">입력한 사항으로 내 맞춤 정보가 수정됩니다.</p>
              <p style="font-size: 20px;">수정하시겠습니까?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateMemberInfo">수정</button>
            </div>
          </div>
        </div>
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
        this.$router.push('/mypage')
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

.address-padding {
  padding-right: 95px;
  padding-left: 95px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.form-control {
  height: 70px;
  font-size: 17px;
  font-weight: 600;
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
  width: 100%;
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
  font-size: 25px; /* 폰트 크기 조정 */
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

.btn-address {
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

.btn-address:hover {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
}

.btn-update {
  height: 70px;
  padding: 8;
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 20px; /* 글씨크기 */
  font-weight: bold;
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
}

.btn-update:hover {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
}

.select {
  opacity: 0;
}

/* 선택되지 않은 라디오 버튼의 스타일 */
.btn-select:not(:checked) + .btn-choice {
  color: white; /* 버튼의 글자색 */
  background-color: #007bff; /* 기본 배경색 */
  height: 50px;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  font-weight: 600;
  font-size: 20px;
}

/* 선택된 라디오 버튼의 스타일 */
.btn-select:checked + .btn-choice {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  color: white; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  height: 50px;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
}

/* 선택되지 않은 라디오 버튼의 스타일 */
.btn-check:not(:checked) + .btn-income {
  color: #000; /* 버튼의 글자색 */
  background-color: #fff; /* 버튼의 배경색 */
  height: 50px;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  font-weight: 600;
  font-size: 20px;
}

/* 선택된 라디오 버튼의 스타일 */
.btn-check:checked + .btn-income {
  background-color: #f4f4f4; /* 선택된 버튼의 배경색 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  color: black; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  height: 50px;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
}

.accordion-collapse {
  max-height: 400px;
  overflow-y: auto;
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
}

.accordion-button:not(.collapsed) {
  background-color:  #f4f4f4;
  font-weight: 600;
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
}

.accordion-button {
  height: 70px;
  font-size: 18px;
  background-color:  #f4f4f4;
  font-weight: 600;
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
}

</style>
