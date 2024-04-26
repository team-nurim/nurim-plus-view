c<template>
  <!-- full page 영역 -->
  <div class="List-container">
    <h4 class="mb-3">무엇이든 물어보세요</h4>
    <button class="btn btn-primary" style="padding:0.75rem 1.5rem; border-radius:1.5rem;" @click="goWrite">문의하기</button>
  </div>

  <div class="container">

  <!--가장 많이 본 게시물 -->
  <div class="mt-5 mb-5">

    <div class="row">
      <div class="col d-flex align-items-start">
        <h4 class="text-start">가장 많이 본 게시물</h4>
        <div class="arrow-buttons ms-auto">
          <span @click="prevPopluarPage" :disabled="currentPage === 0" class="arrow-button-prev">‹</span>
          <span @click="nextPopluarPage" :disabled="currentPage === totalPages - 1" class="arrow-button-next">›</span>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- card -->
      <div class="col-md-4" v-for="(community, index) in popluarVisbleBoards" :key="index" style="margin-bottom: 1rem;">
        <router-link style="text-decoration: none; color: black;" :to="{ name: 'CommunityDetailView', params: { communityId: community.communityId }}">
          <div class="card">
                <div class="col">
                  <h4 class="card-title">{{ community.memberNickname }}</h4>
                  <span class="card-subtitle mb-2" style="color:#B4B4B4;">
                    등록일자:{{ formatDate(community.registerDate) }}  |  조회수:{{ community.counts }}
                  </span>
              <p class="card-text mt-2">
                {{ community.content.slice(0, 100) }}
                <span v-if="community.content.length > 60">...</span>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

  </div>

  <!--답변을 기다리는 게시물-->
  <div class="mb-5">
    <div class="col d-flex align-items-start">
      <h4>답변을 기다리는 게시물</h4>
      <div class="arrow-buttons ms-auto">
        <span @click="InsqireprevPage" :disabled="currentPage === 0" class="arrow-button-prev">‹</span>
        <span @click="InsqirenextPage" :disabled="currentPage === totalPages - 1" class="arrow-button-next">›</span>
      </div>
    </div>

    <div class="row">
      <router-link class="col-md-3" style="margin-bottom:1rem; text-decoration: none;" v-for="(inquire, index) in insqireVisbleBoards" :key="index" :to="{ name: 'CommunityDetailView', params: { communityId: inquire.communityId }}">
        <div class="card">
          <div class="card-body">
            <div class="col">
              <p class="category">{{ inquire.category }}</p>
            </div>
            <h5 class="card-title">{{ inquire.title }}</h5>
            <p class="card-text">
              {{ inquire.content.slice(0, 100) }}
              <span v-if="inquire.content.length > 60">...</span>
            </p>
          </div>
        </div>
      </router-link>
    </div>

  </div>

  <!--카테고리 및 검색창-->
  <div>

    <div class="row">
      <div class="col-md-6 text-start mb-3">
        <button class="btn btn-outline-secondary" @click="selectCategory('전체')" style="border-radius: 1.2rem;">전체</button>
        <button class="btn btn-outline-secondary" @click="selectCategory('보육')" style="border-radius: 1.2rem;">보육</button>
        <button class="btn btn-outline-secondary" @click="selectCategory('출산')" style="border-radius: 1.2rem;">출산/양육</button>
        <button class="btn btn-outline-secondary" @click="selectCategory('주거')" style="border-radius: 1.2rem;">주거</button>
        <button class="btn btn-outline-secondary" @click="selectCategory('장례')" style="border-radius: 1.2rem;">장례</button>
      </div>

      <div class="col-md-6">
        <input type="text" v-model="searchQuery" placeholder="검색하실 제목을 입력해주세요." class="search-input" @keyup.enter="searchCommunity">
        <i class="fa-solid fa-magnifying-glass search-icon" style="color: skyblue; cursor: pointer;" @click="searchCommunity"></i>
      </div>
    </div>

    <!-- 게시물 리스트 -->
    <div class="list-container" style="display: grid;">
      <div v-for="(community, index) in communityList" :key="index" class="List-card" style="place-items: center;">
        <router-link style = "text-decoration: none; color: black;" :to="{ name: 'CommunityDetailView', params: { communityId: community.communityId}}">
        <div class="listInfo">
          <p style="margin-right: 20px; margin-left: 10px;">닉네임:{{ community.memberNickname }}</p>
          <p style="margin-right: 20px;">등록일:{{ formatDate(community.registerDate) }}</p>
          <p >조회수:{{ community.counts }}</p>
        </div>
          <p class="list-title" style="margin-left: 10px;">
            {{ community.title }}
          </p>
          </router-link>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-white mr-2" @click="previousPage" :disabled="currentPage === 0" style="margin-bottom: 50px;">‹</button>
    <template v-for="groupIndex in Math.ceil(totalPages / 10)">
        <template v-if="currentPage >= (groupIndex - 1) * 10 && currentPage < groupIndex * 10">
            <div v-for="pageNumber in Math.min(10, totalPages - (groupIndex - 1) * 10)" :key="pageNumber">
                <button class="btn btn-white mr-2" @click="goToPage((groupIndex - 1) * 10 + pageNumber)" :class="{ 'btn-white': currentPage === (groupIndex - 1) * 10 + pageNumber }">{{ (groupIndex - 1) * 10 + pageNumber }}</button>
            </div>
        </template>
    </template>
    <button class="btn btn-white" @click="nextPage" :disabled="currentPage === totalPages - 1" style="margin-bottom: 50px;">›</button>
</div>
    <router-link to="/CommunityCreate"><button class="btn btn-primary" style="width: 150px; margin-bottom: 20px;">문의하기</button></router-link>

  </div>

<!-- 위로가기 버튼 -->
<!-- <p class="fixed_top">
    <a href="#">위로</a>
</p> -->

  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'CommunityView',
  data () {
    return {
      popluarBoards: [],
      inquires: [],
      communityList: [],
      filterCommunityList: [],
      selectedCategory: '전체',
      searchQuery: '',
      memberNicknameQuery:'',
      totalPages: 0,
      pageSize: 20,
      popluarCurrentPage: 0,
      currentPage1: 0,
      currentPage: 0,
      mostViewPageSize: 3,
      inquirePageSize: 4,
    }
  },
  computed: {
    popluarTotalPages () {
      return Math.ceil(this.popluarBoards.length / this.mostViewPageSize)
    },
    popluarVisbleBoards () {
      const startIndex = this.popluarCurrentPage * this.mostViewPageSize
      return this.popluarBoards.slice(startIndex, startIndex + this.mostViewPageSize)
    },
    hasNextData () {
      const nextIndex = (this.popluarCurrentPage + 1) * this.mostViewPageSize
      return nextIndex < this.popluarBoards.length
    },
    hasPreviousData () {
      return this.popluarCurrentPage > 0
    },
    inquiretotalPages () {
      return Math.ceil(this.inquires.length / this.inquirePageSize)
    },
    insqireVisbleBoards () {
      const startIndex = this.currentPage1 * this.inquirePageSize
      return this.inquires.slice(startIndex, startIndex + this.inquirePageSize)
    },
    hasInsqireNextData () {
      const nextIndex = (this.currentPage1 + 1) * this.inquirePageSize
      return nextIndex < this.inquires.length
    },
    hasInsqirePreviousData () {
      return this.currentPage1 > 0
    }
  },
  mounted () {
    this.axiosPopularboards()
    this.axiosiquires()
    this.axiosCommunityList()
    window.scrollTo(0, 0)
  },
  methods: {
    async axiosPopularboards () {
      try{
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get('http://localhost:8080/api/v1/popular',{
          headers: {
            'Authorization': `Bearer ${accessToken}`
        }})
        this.popluarBoards = response.data
      } catch (error) {
        console.error('인기글을 받아올 수 없습니다:', error)
      }
    },
    async axiosiquires () {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get('http://localhost:8080/api/v1/community/Inquire',{
          headers: {
            'Authorization': `Bearer ${accessToken}`
        }})
        this.inquires = response.data
      } catch (error) {
        console.error('문의글을 받아올 수 없습니다:', error)
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        await this.axiosCommunityList(this.selectedCategory);
      }
    },
    async previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        await this.axiosCommunityList(this.selectedCategory);
      }
    },
    async axiosCommunityList(category = '전체') {
  try {
    const accessToken = localStorage.getItem('accessToken')
    let url = `http://localhost:8080/api/v1/communityList?page=${this.currentPage}&size=${this.pageSize}`
    if (category !== '전체') {
      url = `http://localhost:8080/api/v1/categoryPage/${category}?page=${this.currentPage}&size=${this.pageSize}`;
    }
    const response = await axios.get(url,{
    headers: {
            'Authorization': `Bearer ${accessToken}`
        }});
    this.communityList = response.data.content;
    this.totalPages = response.data.totalPages;
  } catch (err) {
    console.error('리스트를 불러올 수 없습니다:', err);
  }
},
async selectCategory(category) {
  this.selectedCategory = category;
  await this.axiosCommunityList(category);
},
async searchCommunity() {
  try {
    const accessToken = localStorage.getItem('accessToken')
    let url = `http://localhost:8080/api/v1/community/Search?keyword=${this.searchQuery}`
    const response = await axios.get(url,{
      headers : {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    this.communityList = response.data.content;
    this.totalPages = response.data.totalPages;
  } catch (err) {
    console.log('검색 실패:', err);
  }
},
    nextPopluarPage () {
      if (this.popluarCurrentPage < this.popluarTotalPages - 1 && this.hasNextData) {
        this.popluarCurrentPage++
      }
    },
    prevPopluarPage () {
      if (this.popluarCurrentPage > 0 && this.hasPreviousData) {
        this.popluarCurrentPage--
      }
    },
    InsqirenextPage () {
      if (this.currentPage1 < this.inquiretotalPages - 1 && this.hasInsqireNextData) {
        this.currentPage1++
      }
    },
    InsqireprevPage () {
      if (this.currentPage1 > 0 && this.hasInsqirePreviousData) {
        this.currentPage1--
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber -1;
      this.axiosCommunityList(this.selectedCategory);
    },
    goWrite () {
      this.$router.push('/CommunityCreate')
    }
  }
}
</script>
<style>
/*=======================화살표 스타일============================================*/
.arrow-buttons {
}
.arrow-button-prev {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  background: url('../../assets/images/left_arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: -9999px;
  margin-right: 0.1rem; /* 화살표 간 간격 조정 */
}
.arrow-button-next {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  background: url('../../assets/images/right_arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: -9999px;
}

/*=======================메인 타이틀 스타일============================================*/
.List-container {
  width: 100%;
  padding: 3rem 0rem;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
.subtitle {
  font-size: 16px;
  margin-top: 20px;
}
/*======================가장많이 본 게시물 스타일==========================================*/
.favorite-header {
  align-items: center;
  margin-bottom: 0px; /* 인기글과 화살표 간 간격 조정 */
}
.favoriteboards-title {
  margin-right: auto;
}
.popularContainer {
}

/* 카드 스타일 */
.card {
  text-align: left;
  padding: 1.2rem;
}

.most-view-card {
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 1.2rem;
}

.info {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.counts{
  margin-left: 20px;
}
.info p {
    font-size: 14px;
}

.content {
    font-size: 16px;
    color: #666;
}

/*=======================답변을 기다리는 게시물 스타일==================================*/
.inquire-title{
  margin-right: center;
  font-size: 20px;
  text-align: left;
}

.inquire-header {
  display: flex;
  align-items: center;
  margin-bottom: 0px; /* 인기글과 화살표 간 간격 조정 */
  width: 1300px;
  margin-left: 300px;
  flex-direction: column;
}
.inquire-card {}
.inquireView-card{
  border: 1px solid #ccc;
  border-radius: 8px;
  width: calc(35.23% - 40px); /* 가로 여백 제외한 1/3 너비로 설정 */
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  }
/*====================================================================================*/
/*====================================카테고리 검색창=================================== */
.category-search {
  display: flex;
  align-items: flex-start;
  width: 1000px;
  margin: 0 auto;
}

.category-buttons {
  display: flex;
  gap: 10px;
  margin-right: 30px;
}

.category-button {
  border-radius: 20%;
  background-color: #ffffff;
  border: 1px solid gray;
  padding: 10px 20px;
  cursor: pointer;
}

.category {
  font-size: 0.5rem;
  border: 1px solid #333;
  font-weight: 300;
  border-radius: 1.2rem;
  padding: 0.3rem 0.5rem;
}

.search-input {
  border: 1px solid #ccc;
  border-radius: 1.2rem;
  padding: 0.3rem;
}
.search-container {
  position: relative;
}

.search-input {
  padding-right: 30px; /* 아이콘을 위한 오른쪽 패딩 */
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

/* ======================================카드 스타일링================================= */
.list-container {
  justify-content: center;
  margin-top: 20px;
}

.List-card {
  border-radius: 10px;
  margin-bottom: 20px;
  width: 1000px;
  height: 100px;
  text-align: center;
  background-color: #f0f0f0;
}
.listInfo {
  margin-top: 10px;
  display: flex;
  justify-content: start;
}

.card-content {
  padding: 20px;
}

.card h3 {
  font-size: 18px;
  font-weight: bold;
}

.card p {
  font-size: 16px;
  margin-bottom: 10px;
}
.list-title{
  text-align: left;
}

/* ======================================페이지네이션 스타일링==================================================== */
.pagination {
  margin-top: 20px;
  margin-bottom: 30px;
}

.pagination button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.boardRegister{
  background-color: #007bff; /* primary 색상 */
  color: white; /* 텍스트 색상 */
  border: none; /* 테두리 없음 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 10px 20px; /* 내부 여백 */
  cursor: pointer; /* 커서를 포인터로 설정하여 버튼임을 나타냄 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 길게 만듦 */
  width: 340px;
  font-size: 16px;
}
/* .fixed-button {
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 999;
} */

.card-inquiry {
  border: 1px solid #E0E0E0;
  border-radius: 1rem;
  margin: 0 auto;
}
  </style>
