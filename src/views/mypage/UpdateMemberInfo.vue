<template>
  <main>
    <div class="container">
      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4>회원 정보 수정</h4>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col mt-3 align-items-end">
          <img v-bind:src="member.memberProfileImage" alt="mdo" width="100" height="100" class="rounded-circle">
        </div>
      </div>

      <!-- 프로필 이미지 -->
      <div class="row mb-3 align-items-center">
        <div class="col mt-3 align-items-end">
          <input type="file" ref="fileInput" style="display: none" @change="uploadProfileImage">
          <button type="button" class="btn btn-profile" @click="$refs.fileInput.click()">프로필 사진 수정</button>
          <button type="button" class="btn btn-profile" @click="setDefaultImage">기본 이미지로 설정</button>
        </div>
      </div>

      <!-- 개인 정보 수정 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Email" class="form-label">이메일</label>
        <input class="form-control" type="text" id="Email" v-bind:value="member.memberEmail" aria-label="Disabled input example" disabled readonly>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Password" class="form-label">비밀번호</label>
        <input type="password" id="Password" class="form-control" v-model="member.memberPw" aria-describedby="passwordHelpBlock">
        <div id="passwordHelpBlock" class="form-text">
          비밀번호 자리수, 문자 숫자 등 얼마나 포함하는지 빈칸,이모지 사용 안됨.
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Nickname" class="form-label">닉네임</label>
        <input type="text" id="Nickname" class="form-control" v-model="member.memberNickname">
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-update" @click="updateMemberInfo">수정하기</button>
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
      }
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
    async uploadProfileImage(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('files', file);
      formData.append('memberId', this.member.memberId);

      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/v1/images/upload`, formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,   // 토큰 헤더에 추가
            'Content-Type': 'multipart/form-data'
          }
        });
        this.member.memberProfileImage = response.data.uuid;
      } catch (error) {
        console.error('프로필 이미지 업로드 실패:', error);
      }
    },
    async setDefaultImage() {
      try {
        const memberId = this.member.memberId;
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`api/v1/images/remove/${memberId}`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if(response.data.success) {
          this.member.memberProfileImage = response.data.memberProfileImage;
          console.log('프로필 이미지 삭제 성공')
        } else {
          console.log('프로필 이미지 삭제 실패')
        }
      } catch (error) {
        console.error('프로필 이미지 삭제 실패: ', error)
      }
    },
    async updateMemberInfo() {
      try {
        const memberId = this.member.memberId;
        const updateData = {
          memberPw: this.member.memberPw,
          memberNickname: this.member.memberNickname
        };
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`api/v1/members/${memberId}`, updateData, {
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
