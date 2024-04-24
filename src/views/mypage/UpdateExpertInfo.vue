<template>
  <main>
    <div class="container">
      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4>내 경력 사항 수정</h4>
        </div>
      </div>

      <!-- 개인 정보 수정 -->
      <!-- 이메일 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Email" class="form-label">이메일</label>
        <input type="text" id="Email" class="form-control" :value="member.memberEmail" aria-label="Disabled input example" disabled readonly>
      </div>

      <!-- 닉네임 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Nickname" class="form-label">닉네임</label>
        <input type="text" id="Nickname" class="form-control" :value="member.memberNickname" aria-label="Disabled input example" disabled readonly>
      </div>

      <!-- 증빙 서류 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Expertfile" class="form-label">제출 증빙 서류</label>
        <input type="file" id="Expertfile" class="form-control" ref="fileInput" @change="uploadExpertFileImage" :disabled="member.expertFile !== '증빙서류가 등록되지 않았습니다.'">
        <div v-if="!member.expertFile || member.expertFile === '증빙서류가 등록되지 않았습니다.'" class="custom-padding">
          <p>{{ member.expertFile }}</p>
        </div>
        <img v-else :src="member.expertFile" class="custom-padding">
        <button v-if="member.expertFile && member.expertFile !== '증빙서류가 등록되지 않았습니다.'" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" >제출 서류 변경</button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">제출 서류 변경</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>제출 서류를 변경하시겠습니까?</p>
              <p>서류를 변경하기 위해서 이전 서류는 삭제합니다.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" class="btn btn-primary" @click="cancelImage" data-bs-dismiss="modal">변경하기</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <div class="col">
          <button type="button" class="btn btn-update" @click="cancelUpload">취소</button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-update" :disabled="!isFileInputEnabled" @click="goForward">수정하기</button>
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
      agreed: false,  // 약관 동의 상태
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
      showHiddenText: false,
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
  computed: {
      // 파일 입력이 활성화되었는지 여부를 반환하는 computed 속성 추가
    isFileInputEnabled() {
      return this.member.expertFile !== '증빙서류가 등록되지 않았습니다.';
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
    async uploadExpertFileImage(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('files', file);
      formData.append('memberId', this.member.memberId);

      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/v1/experts/upload`, formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,   // 토큰 헤더에 추가
            'Content-Type': 'multipart/form-data'
          }
        });
        this.member.expertFile = response.data.url;
      } catch (error) {
        console.error('자격증 이미지 업로드 실패:', error);
      }
    },
    async cancelImage() {
      try {
        const memberId = this.member.memberId;
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`api/v1/experts/remove/${memberId}`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if(response.data.success) {
          this.member.expertFile = response.data.expertFile;
          this.$router.push('/updateExpertInfo')
          console.log('자격증 이미지 삭제 성공')
        } else {
          console.log('자격증 이미지 삭제 실패')
        }
      } catch (error) {
        console.error('자격증 이미지 삭제 실패: ', error)
      }
    },
    async cancelUpload() {
      try {
        const memberId = this.member.memberId;
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`api/v1/experts/remove/${memberId}`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        if(response.data.success) {
          this.member.expertFile = response.data.expertFile;
          console.log('자격증 이미지 삭제 성공')
          this.$router.push('/mypage')
        } else {
          console.log('자격증 이미지 삭제 실패')
        }
      } catch (error) {
        console.error('자격증 이미지 삭제 실패: ', error)
      }
    },
    async toggleText() {
      try {
        this.showHiddenText = !this.showHiddenText;
      } catch (error) {
        console.error('텍스트 숨기기/보이기 실패: ', error)
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
      this.$router.push('/mypage')
      alert('증빙서류 수정이 완료되었습니다.')
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
  width: 100%;
}

.btn-update:hover, .btn-update:focus {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: #ffdd00; /* 호버 및 포커스 시 글씨색 변경 */
}

</style>
