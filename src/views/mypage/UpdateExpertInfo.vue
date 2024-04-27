<template>
  <main style="background-color: #FAFBFC;">
    <div class="container  mt-3 mb-3">
      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4 v-if="member.type == false" style="font-weight: 700; font-size: 28px;">계정 전환</h4>
          <h4 v-if="member.type == true" style="font-weight: 700; font-size: 28px;">내 경력 사항 수정</h4>
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

      <!-- 내 계정 상태(전문가/일반인) -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Status" class="form-label">내 계정 상태</label>
        <button v-if="!showHiddenText" type="button" class="btn btn-account" @click="toggleText" :disabled="!isFileInputEnabled || agreed == false || !applyforAccount">
          확인하기
        </button>
        <div v-if="showHiddenText" class="row mt-3 mb-10 align-items-center custom-padding">
          <p id="Status" v-if="member.type === false" style="font-size: 20px; font-weight: 600;">계정 전환 심사 중입니다.</p>
          <p id="Status" v-else-if="member.type === true" style="font-size: 20px; font-weight: 600;">전문가 계정입니다.</p>
        </div>
      </div>

      <!-- 증빙 서류 -->
      <div class="row mt-3 mb-10 align-items-center custom-padding">
        <label for="Expertfile" class="form-label">제출 증빙 서류</label>
        <input type="file" id="Expertfile" class="form-control" style="height: auto;" ref="fileInput" @change="handleFileChange" :disabled="member.expertFile !== '증빙서류가 등록되지 않았습니다.'">
        <div v-if="!member.expertFile || member.expertFile === '증빙서류가 등록되지 않았습니다.'" class="custom-padding">
          <p class="mt-3" style="font-size: 20px;">{{ member.expertFile }}</p>
        </div>
        <img v-else :src="member.expertFile" class="mt-3 mb-3 custom-padding">
        <div class="row mt-3 mb-10 align-items-center custom-padding">
          <button v-if="member.expertFile && member.expertFile !== '증빙서류가 등록되지 않았습니다.'" type="button" class="col btn btn-changefile" data-bs-toggle="modal" data-bs-target="#exampleModal">
          제출 서류 변경
          </button>
          <button v-if="!agreed" type="button" class="col btn btn-changefile" style="margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#termsModal" :disabled="agreed">
            약관 보기 및 동의
          </button>
        </div>
      </div>

      <!-- Modal 제출서류 변경 -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">제출 서류 변경</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-modal">제출 서류를 변경하시겠습니까?</p>
              <p class="text-modal">서류를 변경하기 위해서 이전 서류는 삭제합니다.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" class="btn btn-primary" @click="cancelImage" data-bs-dismiss="modal">변경하기</button>
            </div>
          </div>
        </div>
      </div>

      <!-- The Modal 약관 -->
      <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="termsModalLabel">자격증 이미지 제출에 대한 개인정보 처리 동의서</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- 약관 내용 -->
            <div class="modal-body" style="text-align: left;">
              <p style="font-weight: 700; font-size: 18px;">제출하시는 자격증 이미지(이하 "이미지")는 당사의 서비스에 필요한 용도로만 사용되며, 개인 정보 보호법에 따라 안전하게 보호됩니다.</p>
              <p>아래의 내용을 읽고 동의하신 후 이미지 제출 부탁드립니다.</p>
              <p class="text-modal">1. 제출 목적: 이미지는 서비스 내에서 사용자의 신분을 확인하고, 서비스 품질 향상을 위한 목적으로 사용됩니다.</p>
              <p class="text-modal">2. 수집 항목: 이미지는 자격증 또는 인증서와 관련된 정보를 포함하고 있습니다.</p>
              <p class="text-modal">3. 이용 목적: 이미지는 서비스 내에서 사용자 신분 확인 및 관리 목적으로 사용되며, 이외의 목적으로 사용되지 않습니다.</p>
              <p class="text-modal">4. 보유 기간: 이미지는 서비스 운영에 필요한 기간 동안에만 보유되며, 해당 기간 종료 후 즉시 파기됩니다.</p>
              <p class="text-modal">5. 제 3 자 제공: 이미지는 사용자의 동의 없이 제 3 자에게 제공되지 않습니다. 단, 법률에 따라 정해진 경우에는 예외로 합니다.</p>
              <p class="text-modal">6. 개인정보의 파기: 제출된 이미지는 목적 달성 후 즉시 안전하게 파기됩니다.</p>
              <p class="text-modal">7. 동의 철회: 이미지 제출에 대한 동의는 언제든지 철회할 수 있습니다. 동의 철회 시, 이미지는 파기되고 이후 사용되지 않습니다.</p>
              <p class="text-modal">8. 기타 권리: 개인 정보 보호법 및 관련 법령에 따라 사용자는 개인정보에 관한 열람, 정정, 삭제, 처리정지 등의 권리를 가지고 있습니다.</p>
              <p style="font-size: 15px; font-weight: 600;">아래의 동의하기 버튼을 누르면 자동으로 제출 서류가 변경됩니다.</p>
              <p style="font-size: 15px;">본 동의서에 동의하십니까?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="button" class="btn btn-primary" @click="agreedModal" data-bs-dismiss="modal" :disabled="!isFileInputEnabled">동의하기</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3 mb-10 align-items-center custom-padding">

          <button type="button" class="btn btn-cancel" style="margin-right: 8px;" @click="goback">뒤로 가기</button>

          <button v-if="agreed && !member.type" type="button" class="btn btn-cancel" @click="cancelUpload">계정 전환 취소</button>

        <!-- <div class="col">
          <button type="button" class="btn btn-update" @click="applyforAccount" :disabled="!isFileInputEnabled || agreed == true || applied">계정 전환 신청</button>
        </div> -->
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
  name: 'SwitchAccount',
  computed: {
    ...mapGetters(['getLoggedIn'], ['getAgreed'], ['getApplied']),
    memberNickname() {
      return this.member.memberNickname;
    },
  },
  data () {
    return {
      loggedIn: false,
      agreed: false,  // 약관 동의 상태
      applied: false,
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
      tempFile: null
    }
  },
  async created () {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // 로그인 상태가 있을 경우 Vuex 상태 업데이트
      this.$store.commit('setLoggedIn', true)
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
    }
  },
  computed: {
    // 파일 입력이 활성화되었는지 여부를 반환하는 computed 속성 추가
    isFileInputEnabled() {
      return this.member.expertFile !== '증빙서류가 등록되지 않았습니다.';
    },
    agreed() {
      return this.$store.state.agreed;
    },
    applied() {
      return this.$store.state.applied;
    },
    // 버튼이 활성화되는지 여부를 반환하는 computed 속성 추가
    isAccountUpdateEnabled() {
      return this.isFileInputEnabled && this.agreed && !this.applied;
    },
  },
  mutations: {
    setAgreed(state, agreed) {
      state.agreed = agreed;
      localStorage.setItem('agreed', agreed)
    },
    setApplied(state, applied) {
      state.applied = applied;
      localStorage.setItem('applied', applied)
    }
  },
  mounted() {
    this.fetchMemberInfo();
  },
  methods: {
    async agreedModal() {
      this.$store.commit('setAgreed', true)
      localStorage.setItem('agreed', true);

      if(this.tempFile) {
        const formData = new FormData();
        formData.append('files', this.tempFile);
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
          alert('제출 서류 수정이 완료되었습니다.')

          this.$store.commit('setApplied', true);

          // 상태를 로컬 스토리지에 저장합니다.
          localStorage.setItem('applied', true);

          // this.$store.commit('setAgreed', true);
          // localStorage.setItem('agreed', true);
        } catch (error) {
          console.error('자격증 이미지 업로드 실패:', error);
        }
      } else {
        // alert('자격증 이미지를 선택해주세요.')
      }

    },
    async applyforAccount() {

      if(this.tempFile) {
        const formData = new FormData();
        formData.append('files', this.tempFile);
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
          alert('제출 서류 수정이 완료되었습니다.')

          this.$store.commit('setApplied', true);
          // 상태를 로컬 스토리지에 저장합니다.
          localStorage.setItem('applied', true);

        } catch (error) {
          console.error('자격증 이미지 업로드 실패:', error);
        }
      } else {
        alert('자격증 이미지를 선택해주세요.')
      }
    },
    handleFileChange(event) {
      this.tempFile = event.target.files[0];
      if(this.tempFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.member.expertFile = e.target.result;
        }
      reader.readAsDataURL(this.tempFile);
      }
    },
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
          window.location.reload();
          this.$router.push('/switchAccount')
          // this.showModal = false;
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
          window.location.reload();
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
    goback() {
      this.$router.push('/mypage')
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

.btn-profile:hover {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
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
  font-size: 20px; /* 폰트 크기 조정 */
  font-weight: bold; /* 폰트 두께 조정 */
  align-self: start; /* Flex 아이템 수직 중앙 정렬 */
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

.btn-update:hover {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
}

.btn-cancel {
  height: 50px;
  padding: 8;
  background-color: gray; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
  width: 100%;
}

.btn-cancel:hover {
  background-color: lightgray; /* 호버 및 포커스 시 배경색 변경 */
  color: black; /* 호버 및 포커스 시 글씨색 변경 */
}

.btn-account {
  height: 50px;
  padding: 8;
  background-color: gray; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
}

.btn-account:hover {
  background-color: lightgray; /* 호버 및 포커스 시 배경색 변경 */
  color: black; /* 호버 및 포커스 시 글씨색 변경 */
}

.btn-changefile {
  height: 50px;
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 글씨색 */
  font-size: 16px; /* 글씨크기 */
  border: none; /* 외곽선 제거 */
  outline: none; /* 클릭 시 나타나는 외곽선 제거 */
  transition: background-color 0.3s, color 0.3s; /* 색상 변화에 애니메이션 효과 적용 */
}

.btn-changefile:hover {
  background-color: #0056b3; /* 호버 및 포커스 시 배경색 변경 */
  color: white; /* 호버 및 포커스 시 글씨색 변경 */
}

.text-modal {
  font-weight: 700;
  font-size: 15px;
}

</style>
