<template>
  <main style="background-color: #FAFBFC;">
    <div class="container mt-3 mb-4">
      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4 style="font-weight: 700; font-size: 28px;">마이페이지</h4>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-6 mt-3 align-items-center">
          <img v-bind:src="member.memberProfileImage" alt="mdo" width="70" height="70" class="rounded-circle">
          <img v-if="member.type == true" src="../../assets/images/expert_badge.png" alt="mdo" width="50" height="50" style="margin-left: 200px;">
        </div>
        <div class="col-2 align-items-center">
          <div style="font-size: 20px; font-weight: 500;">{{ member.memberNickname }} 님</div><br>
          <div style="font-size: 15px; font-weight: 500;">{{ member.memberEmail }}</div>
        </div>
        <div class="col-4 align-items-center">
          <button type="button" @click="goForward" class="btn btn-profile">회원 정보 수정</button>
        </div>
      </div>

      <hr class="custom-divider hr-sm">

      <div v-if="member.type == false" class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" @click="goForward2" class="btn btn-menu">
          <span class="menu-text mx-2">내 맞춤 정보 수정</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <div v-if="member.type == true" class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" @click="goForward4" class="btn btn-menu">
          <span class="menu-text mx-2">내 경력 사항 수정</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <div v-if="member.type ==  false" class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" @click="goForward3" class="btn btn-menu">
          <span class="menu-text mx-2">계정 전환</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <hr class="custom-divider hr-sm">

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-menu" @click="goForward5">
          <span class="menu-text mx-2">내가 받을 수 있는 지원금</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-menu" @click="goForward6">
          <span class="menu-text mx-2">정책 정보</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-menu" @click="goForward7">
          <span class="menu-text mx-2">지식 커뮤니티</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <hr class="custom-divider hr-sm">

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <button type="button" class="btn btn-menu" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <span class="menu-text mx-2">계정 탈퇴</span>
          <span class="menu-text mx-2">〉</span>
        </button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">계정 탈퇴</h1>
              <button type="button" class="btn-close mb-8" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              정말 탈퇴하시겠습니까?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" class="btn btn-primary" @click="deleteMemberInfo" data-bs-dismiss="modal">탈퇴하기</button>
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
  name: 'NurimHeader',
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
      showModal: false
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
        const response = await axios.get('/api/v1/members/mypage', {
          headers: {
            'Authorization': `Bearer ${accessToken}`   // 토큰 헤더에 추가
          }
        })
        this.member = response.data;
      } catch (error) {
        console.error('회원정보를 불러오지 못했습니다.', error);
      }
    },
    async deleteMemberInfo () {
      try {
        const memberId = this.member.memberId;
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.delete(`/api/v1/members/${memberId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,   // 토큰 헤더에 추가
            'Content-Type': `application/json`
          }
        });
        console.log('계정 삭제 성공: ', response.data);
        alert('정상적으로 탈퇴되었습니다.');
        this.$router.push('/join')
      } catch (error) {
        console.error('계정 삭제 실패: ', error)
        alert('계정 삭제에 실패했습니다.');
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
    goForward () {
      this.$router.push('/updateMemberInfo')
    },
    goForward2 () {
      this.$router.push('/updateMemberInfo2')
    },
    goForward3 () {
      this.$router.push('/switchAccount')
    },
    goForward4 () {
      this.$router.push('/updateExpertInfo')
    },
    goForward5 () {
      this.$router.push('/recommend-main')
    },
    goForward6 () {
      this.$router.push('/policy')
    },
    goForward7 () {
      this.$router.push('/community')
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

.btn-menu {
  height: 70px;
  background-color: white; /* 기본 배경색 */
  color: black; /* 글씨색 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-menu:hover {
  background-color: #f4f4f4; /* 호버 및 포커스 시 배경색 변경 */
  color: black; /* 호버 및 포커스 시 글씨색 변경 */
}

.btn-profile {
  height: 40px;
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글씨색 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  box-shadow:  0 4px 8px rgba(0, 0, 0, 0.1); /* X축 오프셋, Y축 오프셋, 흐림 반경, 색상 */
  font-size: 16px;
  font-weight: 500;
}

.btn-profile:hover {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
}

.menu-text {
  font-size: 18px;
  font-weight: 700;
}

</style>
