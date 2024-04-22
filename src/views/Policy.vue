<template>
  <main class="mt-5">
    <div class="container">

      <div class="row align-items-center">
        <div class="col mt-3 mb-3">
          <h4>이번 달 가장 인기있는 소식</h4>
        </div>
      </div>

      <!-- 최신 정책 콘텐츠 -->
      <div class="post-contents mb-5">
        <div class="row">
          <div class="col-md-3" v-for="post in posts" :key="post.postId">
            <div class="card" style="margin:1.2rem; border:none; text-align: left; padding-left: 0;">
              <img :src=post.thumbImage class="card-img-top" style="height: 100%; object-fit: cover;">
              <div class="col-9 card-body">
                <h5 class="card-title">{{ post.postTitle }}</h5>
                <p class="card-text">{{ post.postContent }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 카테고리 선택 -->
      <div class="row mt-3 mb-5 align-items-center">
        <div class="row">

          <div class="col-6 accordion" id="Policy1">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  도/특별시/광역시
                </button>
              </h2>
              <div :id="collapseOne" class="accordion-collapse collapse" :data-bs-parent="Residence1">
                <div class="accordion-body" style="text-align: left;">
                  <a class="dropdown-item mt-3 mb-3 region-padding" href="#" @click="selectRegion('서울특별시')" :class="{ 'selected': selectedRegion === '서울특별시' }">서울특별시</a>
                  <a class="dropdown-item mt-3 mb-3 region-padding" href="#" @click="selectRegion('경기도')" :class="{ 'selected': selectedRegion === '경기도' }">경기도</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 accordion" id="Policy2">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  시/군/구
                </button>
              </h2>
              <div :id="collapseTwo" class="accordion-collapse collapse" :data-bs-parent="Residence2">
                <div class="accordion-body" style="text-align: left;">
                  <a class="dropdown-item mt-3 mb-3" href="#" v-for="district in selectedDistricts" :key="district">{{ district }}</a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="row mt-3 mb-3">
          <div class="col accordion" id="Policy3">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                  카테고리
                </button>
              </h2>
              <div :id="collapseThree" class="accordion-collapse collapse show" :data-bs-parent="Policy3">
                <div class="accordion-body" style="text-align: left;">
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="selectCategory('주거지원')">주거지원</a>
                  <a class="dropdown-item mt-3 mb-3" href="#" @click="selectCategory('출산/양육/보육')">출산/양육/보육</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <hr class="custom-divider hr-sm">
        </div>

        <div class="row mt-3 mb-3">
          <button type="button" class="btn btn-policy">정책 1</button>
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
      posts: [],
      accordionId: 'Residence', // 아코디언의 부모 요소 ID
      collapseOne: 'collapseOne', // 첫 번째 아코디언의 collapse ID
      collapseTwo: 'collapseTwo', // 두 번째 아코디언의 collapse ID
      collapseThree: 'collapseThree',
      selectedRegion: '', // 선택한 도/특별시/광역시
      selectedDistricts: [], // 선택한 시/군/구 목록
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
    this.fetchPosts();
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
    async fetchPosts () {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get(`/api/v1/home/postList`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,  // 토큰 헤더에 추가
            'Content-Type': `application/json`
          }
        })
      // postId에 따라 데이터 필터링하여 할당
      this.posts = response.data.content;
      } catch (error) {
        console.error('게시물을 불러오지 못했습니다.', error);
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
    async selectRegion(region) {
      this.selectedRegion = region; // 선택한 도/특별시/광역시 업데이트
      // 선택한 도/특별시/광역시에 따라 시/군/구 목록 업데이트
      if (region === '서울특별시') {
        this.selectedDistricts = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
      } else if (region === '경기도') {
        this.selectedDistricts = ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'];
      }
    },
    async selectCategory(category) {
      this.selectedCategory = category;
    }
  }
}
</script>

<style scoped>
.custom-divider {
  border: none; /* 테두리 없음 */
  height: 4px; /* 높이 조절 (원하는 높이로 변경) */
  background-color: blue; /* 배경색 지정 */
  margin: 1px 0; /* 위아래 여백 지정 (원하는 여백으로 변경) */
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

.selected {
  background-color: lightblue; /* 선택한 지역의 배경색을 변경 */
  color: black; /* 선택한 지역의 글자색을 변경 */
}

.region-padding {
  padding-top: 10px;
  padding-bottom: 10px;
}

.btn-policy:focus {
  outline: none; /* 클릭 시 포커스 테두리 제거 */
}
</style>
