<template>
  <main style="background-color: #FAFBFC;">
    <div class="container mt-3 mb-3">
      <div class="row align-items-center">
        <div class="col mt-3 mb-4">
          <h4 style="font-weight: 700; font-size: 28px;">회원 정보 수정</h4>
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
          <button type="button" class="btn btn-profile" style="margin-right: 10px;" @click="$refs.fileInput.click()">프로필 사진 수정</button>
          <button type="button" class="btn btn-profile" @click="setDefaultImage">기본 이미지로 설정</button>
        </div>
      </div>

      <!-- 개인 정보 수정 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Email" class="form-label">이메일</label>
        <input class="form-control" style="font-weight: bold;" type="text" id="Email" v-bind:value="member.memberEmail" aria-label="Disabled input example" disabled readonly>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Password" class="form-label">비밀번호</label>
        <input type="password" id="Password" class="form-control" v-model="member.memberPw" placeholder="새로운 비밀번호를 입력하세요" aria-describedby="passwordHelpBlock">
        <div id="passwordHelpBlock" class="form-text">
          비밀번호 자리수 8자 이상 16자 이하
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
    ...mapGetters(['getLoggedIn', 'getMemberInfo']),
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
    if (accessToken) {
      // 로그인 상태가 있을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', true)
      this.$store.commit('setMemberInfo', this.member)
    } else {
      // 로그인 상태가 없을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', false)
    }
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
    },
    getmemberInfo(newValue) {
      this.member = newValue
      if(newValue) {
        this.fetchMemberInfo()
      }
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
  height: 30px;
  background-color: lightgray; /* 기본 배경색 */
  color: black; /* 글씨색 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
  font-size: 12px;
  font-weight: 500;
}

.btn-profile:hover, .btn-profile:focus {
  background-color: white; /* 호버 및 포커스 시 배경색 변경 */
  color: black; /* 호버 및 포커스 시 글씨색 변경 */
}

.form-control {
  height: 70px;
  font-size: 17px;
  font-weight: 600;
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
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
  font-size: 20px; /* 폰트 크기 조정 */
  font-weight: bold; /* 폰트 두께 조정 */
  align-self: start; /* Flex 아이템 수직 중앙 정렬 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
}

.form-text {
  font-size: 15px;
  margin-right: 1rem; /* 레이블과 입력 필드 사이에 공간 추가 */
  width: auto; /* 필요한 만큼 너비를 자동으로 설정 */
  flex-shrink: 0; /* 화면 크기가 줄어들 때 레이블의 크기가 줄어들지 않도록 설정 */
  color: darkgray; /* 글씨 색*/
  align-self: start; /* Flex 아이템 수직 중앙 정렬 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
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

.btn-update:hover, .btn-update:focus {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
}

</style>
