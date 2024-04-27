<template>
<main>

  <!-- 플로팅 버튼 -->
  <div class="floating-button mt-5 mb-5"
  style="position:fixed; left:50%; transform:translateX(-50%); z-index:1000; bottom:1.5rem;">
    <button class="btn btn-primary" style="width:16rem; padding:0.65rem; border-radius:1.5rem;" @click="goAsk">문의하기</button>
  </div>

    <!-- full page 영역 -->
  <div class="list-container">
    <img src="../../assets/inquiry.png" class="mb-3">
    <h3 class="mb-3">무엇이든 물어보세요</h3>
    <!-- <button class="btn btn-primary" style="padding:0.5rem 3rem; border-radius:1.5rem;" @click="goWrite">문의하기</button> -->
  </div>

    <div class="container">

  <!--가장 많이 본 게시물 -->
  <div class="mt-5 mb-5">

    <div class="row">
      <div class="col d-flex align-items-start  mb-2">
        <h4 class="text-start">가장 많이 본 게시물</h4>
        <div class="arrow-buttons ms-auto" >
          <span @click="prevPopluarPage" :disabled="currentPage === 0" class="arrow-button-prev">‹</span>
          <span @click="nextPopluarPage" :disabled="currentPage === totalPages - 1" class="arrow-button-next">›</span>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- card -->
      <div class="col-md-4" v-for="(community, index) in popluarVisbleBoards" :key="index" style="margin-bottom:1rem;">
        <router-link style="text-decoration: none; color: black;" :to="{ name: 'CommunityDetailView', params: { communityId: community.communityId }}">
          <div class="card" style="border-radius:1rem;">
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
    <div class="col d-flex align-items-start mb-2">
      <h4>답변을 기다리는 게시물</h4>
      <div class="arrow-buttons ms-auto">
        <span @click="InsqireprevPage" :disabled="currentPage === 0" class="arrow-button-prev">‹</span>
        <span @click="InsqirenextPage" :disabled="currentPage === totalPages - 1" class="arrow-button-next">›</span>
      </div>
    </div>

    <div class="row">
      <router-link class="col-md-3" style="margin-bottom:1rem; text-decoration:none;" v-for="(inquire, index) in insqireVisbleBoards" :key="index" :to="{ name: 'CommunityDetailView', params: { communityId: inquire.communityId }}">
        <div class="card" style="border-radius:1rem;">
          <div class="card-body" style="padding:0;">
            <span class="category" style="font-size:0.75rem !important; color:#FFF; background-color:#333;">{{ inquire.category }}</span>
            <h5 class="mt-2">{{ inquire.title }}</h5>
            <p class="card-text">
              {{ inquire.content.slice(0, 100) }}
              <span v-if="inquire.content.length > 60">...</span>
            </p>
          </div>
        </div>
      </router-link>
    </div>

  </div>

  </div>
</main>

<main style="background-color:#EFF7FF;">
  <div class="container" style="max-width:800px;">

      <!--카테고리 및 검색창-->
    <div class="mt-5 mb-5">

      <br>
      <div class="row">
        <div class="col-md-6 text-start mb-3">
          <button class="btn btn-outline-dark me-1 mb-1" @click="selectCategory('전체')" style="font-size:0.75rem; border-radius:1.2rem;">전체</button>
          <button class="btn btn-outline-dark me-1 mb-1" @click="selectCategory('보육')" style="font-size:0.75rem; border-radius:1.2rem;">보육</button>
          <button class="btn btn-outline-dark me-1 mb-1" @click="selectCategory('출산')" style="font-size:0.75rem; border-radius:1.2rem;">출산/양육</button>
          <button class="btn btn-outline-dark me-1 mb-1" @click="selectCategory('주거')" style="font-size:0.75rem; border-radius:1.2rem;">주거</button>
          <button class="btn btn-outline-dark me-1 mb-1" @click="selectCategory('장례')" style="font-size:0.75rem; border-radius:1.2rem;">장례</button>
        </div>

        <div class="col-md-6 mb-3">
          <div class="input-group">
            <input type="text" v-model="searchQuery" placeholder="검색어를 입력해주세요." class="form-control search-input" @keyup.enter="searchCommunity">
            <span class="input-group-text">
              <i class="fa-solid fa-magnifying-glass search-icon" style="color:#333; cursor:pointer;" @click="searchCommunity"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- 게시물 리스트 -->
      <div>
        <div v-for="(community, index) in communityList" :key="index" class="list-card" style="place-items: center;">
          <router-link style="text-decoration:none; color:black; magin:0;" :to="{ name: 'CommunityDetailView', params: { communityId: community.communityId}}">
          <div class="text-start mb-2">
            <span style="margin-right: 1rem;">닉네임: {{ community.memberNickname }}</span>
            <span style="margin-right: 1rem;">등록일: {{ formatDate(community.registerDate) }}</span>
            <span style="margin-right: 1rem;" >조회수: {{ community.counts }}</span>
          </div>
            <p style="text-align:left;">
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

    </div>

    <!-- 위로가기 버튼 -->
    <p style="position:fixed; bottom:20px; right:20px;">
      <a href="#">
          <img src="../../assets/images/img_arr_top.png" alt="위로가기" style="width:2rem; height:2.2rem;">
      </a>
    </p>

  </div>

</main>
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
    },
    goAsk () {
      this.$router.push('/community')
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
    },
    goAsk () {
      this.$router.push('/CommunityCreate')
    }
  }
}
</script>
<style scoped>
/* 메인 타이틀 스타일 */
.list-container {
  width: 100%;
  padding: 3rem 0rem;
  justify-content: center;
  align-items: center;
}

/* 화살표 스타일 */
.arrow-buttons {
  display: flex;
  align-items: center;
}

.arrow-button-prev,
.arrow-button-next {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.3rem; /* 화살표 간 간격 조정 */
  font-size: 2rem; /* 화살표 아이콘 크기 조정 */
  padding-bottom: 0.6rem;
  font-weight: 200;
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

.content {
    font-size: 16px;
    color: #666;
}

/* 답변을 기다리는 게시물 스타일 */
.inquire-title {
  margin-right: center;
  font-size: 1rem;
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

.inquireView-card {
  border: 1px solid #ccc;
  border-radius: 1rem;
  background-color: #fff;
  padding: 0.5rem;
  margin-bottom: 1.2rem;
  }
/* 카테고리 검색창 */
.category-search {
  display: flex;
  align-items: flex-start;
  width: 1000px;
  margin: 0 auto;
}

.category-buttons {
  display: flex;
  gap: 0.1rem;
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
  font-size: 0.35rem;
  border: 1px solid #333;
  font-weight: 300;
  border-radius: 1.2rem;
  padding: 0.2rem 0.6rem 0.3rem 0.6rem;
}

.search-input {
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  padding: 0.4rem;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

/* 카드 스타일링 */
.container {
  max-width: 1000px;
}

.list-card {
  border-radius: 1rem;
  margin-bottom: 1.2rem;
  padding: 1rem;
  min-height: 3rem;
  text-align: center;
  background-color: #FFF;
}

.listInfo {
  margin-top: 10px;
  display: flex;
  justify-content: start;
}

.card h3 {
  font-size: 1rem;
  font-weight: bold;
}

.list-title{
  text-align: left;
}

/* 페이지네이션 스타일링 */

.boardRegister {
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

.fixed-button {
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 999;
}

.card-inquiry {
  border: 1px solid #E0E0E0;
  border-radius: 1rem;
  margin: 0 auto;
}

p {
  font-size: 0.75rem;
}

.floating-button button {
  border-radius: 1rem;
  padding: 15px;
  font-size: 16px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.13);
}
</style>
