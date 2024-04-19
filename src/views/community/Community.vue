c<template>
      <div class="container">
        <h1 class="title" style="font-weight: bold">무엇이든 물어보세요</h1>
        <router-link to="/CommunityCreate" style="text-decoration: none; color: black;"><p class="subtitle">어디에 어떻게 물어볼지 모르겠다면 여기에</p></router-link>
      </div>
      <!--가장많이 본 게시물 -->
      <div class="favorite-container">
        <div class="arrow-buttons">
          <h3 class="favoriteboards-title" style="margin-left: 300px">가장 많이 본 게시물</h3>
          <a @click="prevPopluarPage" :disabled="currentPage === 0" class="arrow-button1">‹</a>
          <a @click="nextPopluarPage" :disabled="currentPage === totalPages - 1" class="arrow-button" style="margin-right: 300px">›</a>
        </div>
        <div class="popularContainer">
        <div v-for="(community, index) in popluarVisbleBoards" :key="index" class="mostView-card">
          <router-link style = "text-decoration: none; color: black;" :to="{ name: 'CommunityDetailView', params: { communityId: community.communityId }}">
          <h2 class="mostViewNickName">{{ community.memberNickname }} </h2>
    <div class="info">
        <p class="date">등록일자:{{ formatDate(community.registerDate) }}</p>
        <p class="counts">조회수:{{ community.counts }}</p>
    </div>
    <p class="content">{{ community.content }}</p>
  </router-link>
          </div>
        </div>
      </div>
      <!-- 가장많이 본 게시물-->
      <!--답변을 기다리는 게시물-->
      <div class="inquire-container">
        <div class="arrow-buttons">
          <h3 class="inquire-title" style="font-size: 30px; margin-left: 300px">답변을 기다리는 게시물</h3>
          <a @click="InsqireprevPage" :disabled="currentPage === 0" class="arrow-button1" style="margin-left: 930px">‹</a>
          <a @click="InsqirenextPage" :disabled="currentPage === totalPages - 1" class="arrow-button">›</a>
        </div>
      <div class="inquire-card">
        <router-link style="text-decoration: none; color: black;" v-for="(inquire, index) in insqireVisbleBoards" :key="index" :to="{ name: 'CommunityDetailView', params: { communityId: inquire.communityId }}" class="inquireView-card">
        <div class="category-info">
        <p class="category" style="border-radius: 30px;">{{ inquire.category }}</p>
      </div>
        <h2 class="inquire-title">{{ inquire.title }}</h2>
        <p class="content">{{ inquire.content }}</p>
        </router-link>
        </div>
      </div>
    <!--답변을 기다리는 게시물-->
    <!--카테고리 및 검색창-->
    <div class="container1">
    <div class="category-search">
    <div class="category-buttons">
      <button class="btn btn-outline-secondary" @click="selectCategory('전체')" style="border-radius: 17px;">전체</button>
      <button class="btn btn-outline-secondary" @click="selectCategory('보육')" style="border-radius: 17px;">보육</button>
    <button class="btn btn-outline-secondary" @click="selectCategory('양육')" style="border-radius: 17px;">출산/양육</button>
    <button class="btn btn-outline-secondary" @click="selectCategory('주거')" style="border-radius: 17px;">주거</button>
    <button class="btn btn-outline-secondary" @click="selectCategory('장례')" style="border-radius: 17px;">장례</button>
  </div>
  <div class="search-container">
  <input type="text" v-model="searchQuery" placeholder="검색하실 제목을 입력해주세요." class="search-input">
  <i class="fa-solid fa-magnifying-glass search-icon" style="color: skyblue; cursor: pointer;" @click="searchCommunity"></i>
</div>
</div>
     <!-- 게시물 리스트 -->
  <div class="list-container" style="display: grid;">
    <div v-for="(community, index) in communityList" :key="index" class="List-card" style="place-items: center;">
      <router-link style = "text-decoration: none; color: black;" :to="{ name: 'CommunityDetailView', params: { communityId: community.communityId }}">
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
        <div v-for="pageNumber in totalPages" :key="pageNumber">
          <button class="btn btn-white mr-2" @click="goToPage(pageNumber)" :class="{ 'btn-white': currentPage === pageNumber }">{{ pageNumber }}</button>
        </div>
        <button class="btn btn-white" @click="nextPage" :disabled="currentPage === totalPages -1" style="margin-bottom: 50px;">›</button>
      </div>
  <router-link to="/CommunityCreate"><button class="btn btn-primary" style="width: 100px;">문의하기</button></router-link>
</div>
<!-- 위로가기 버튼 -->
<p class="fixed_top">
        <a href="#">위로</a>
    </p>
  </template>
<script>
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
    let url = `http://localhost:8080/api/v1/community/Search?title=${this.searchQuery}`
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
  }
}
</script>
  <style>
  /*=======================화살표 스타일============================================*/
  .arrow-buttons {
    display: flex;
    align-content: center;
  }
  .arrow-button1 {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url('../../assets/images/left_arrow.png');
    text-indent: -9999px;
    margin-right: 5px; /* 화살표 간 간격 조정 */
  }
  .arrow-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url('../../assets/images/right_arrow.png');
    text-indent: -9999px;
  }
  /*=======================메인 타이틀 스타일============================================*/
  .container {
    width: 100%;
    height: 28vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding-top: 60px;
    margin-bottom: 100px;
  }
  .title{
    font-size: 52px;
  }
  .subtitle {
    font-size: 16px;
    margin-top: 20px;
  }
  /*======================가장많이 본 게시물 스타일==========================================*/
.favorite-container {
    margin-bottom: 100px;
  }
  .favorite-header {
    align-items: center;
    margin-bottom: 0px; /* 인기글과 화살표 간 간격 조정 */
    margin-left: 300px;
  }
  .favoriteboards-title {
    margin-right: auto;
  }
    .popularContainer {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;
    }
    .mostView-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: calc(23.33% - 40px); /* 가로 여백 제외한 1/3 너비로 설정 */
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .mostView-card h2 {
    font-size: 18px;
    font-weight: bold;
}
.mostViewNickName{
  margin-right: 180px;
}
.info {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.category-info {
  display: flex;
    justify-content: center;
    margin-bottom: 10px;
    justify-content: flex-start;
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
  .inquire-container{
    margin-bottom: 100px;
  }
  .inquire-title{
    margin-right: center;
    font-size: 20px;
      text-align: start;
  }
  .inquire-header {
    display: flex;
    align-items: center;
    margin-bottom: 0px; /* 인기글과 화살표 간 간격 조정 */
    width: 1300px;
    margin-left: 300px;
    flex-direction: column;
  }
  .inquire-card {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;
    }
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
   .container1{
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding-top: 60px;
    margin-bottom: 100px;
  }
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
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px; /* 원하는 둥근 정도로 조절 */
  background-color: #ccc; /* 배경색 설정 */
  padding: 5px 10px; /* 카테고리 내부 패딩 설정 */
}

.search-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  width: 600px;
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
/*위로가기 스타일*/
.fixed_top{
        position: fixed;
        top: 49%;
        right: 5%;
        width: 33px;
        height: 33px;
        margin: 0;
        z-index: 1;
    }
    .fixed_top a{
        display: block;
        width: 33px;
        height: 33px;
        background: url("../../assets/images/img_arr_top.png") no-repeat;
        text-indent: -99999999px;
        overflow: hidden;
    }
  </style>
