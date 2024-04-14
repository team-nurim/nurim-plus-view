<template>
      <div class="container">
        <h1 class="title" style="font-weight: bold">무엇이든 물어보세요</h1>
        <p class="subtitle">어디에 어떻게 물어볼지 모르겠다면 여기에</p>
      </div>
      <!--가장많이 본 게시물 -->
      <div class="favorite-container">
        <div class="arrow-buttons">
          <h3 class="favoriteboards-title" style="margin-left: 300px">가장 많이 본 게시물</h3>
          <a @click="prevPage" :disabled="currentPage === 0" class="arrow-button1">‹</a>
          <a @click="nextPage" :disabled="currentPage === totalPages - 1" class="arrow-button" style="margin-right: 300px">›</a>
        </div>
        <div class="popularContainer">
        <div v-for="(community, index) in popluarVisbleBoards" :key="index" class="mostView-card">
          <h2 class="mostViewNickName">{{ community.memberNickname }} </h2>
    <div class="info">
        <p class="date">등록일자:{{ formatDate(community.registerDate) }}</p>
        <p class="counts">조회수:{{ community.counts }}</p>
    </div>
    <p class="content">{{ community.content }}</p>
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
      <div v-for="(inquire, index) in insqireVisbleBoards" :key="index" class="inquireView-card">
        <div class="info">
        <p class="category">{{ inquire.category }}</p>
      </div>
        <h2 class="inquire-title">{{ inquire.title }}</h2>
        <p class="content">{{ inquire.content }}</p>
        </div>
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
  <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요" class="search-input">
  <i class="fa-solid fa-magnifying-glass search-icon" style="color: skyblue; cursor: pointer;" @click="searchCommunity"></i>
</div>
</div>
     <!-- 게시물 리스트 -->
  <div class="list-container" style="display: grid;">
    <div v-for="(community, index) in communityList" :key="index" class="List-card" style="place-items: center;">
      <div class="listInfo">
        <p style="margin-right: 20px; margin-left: 10px;">닉네임:{{ community.memberNickname }}</p>
        <p style="margin-right: 20px;">등록일:{{ formatDate(community.registerDate) }}</p>
        <p >조회수:{{ community.counts }}</p>
      </div>
        <p class="list-title" style="margin-left: 10px;">{{ community.title }}</p>
        </div>
      </div>
    <!-- 페이지네이션 -->
    <div class="pagination">
  <button @click="prevPage2" :disabled="currentPage === 0">이전</button>
    <button v-for="pageNumber in Math.min(totalPages, 8)" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage + 1 }">{{ pageNumber }}</button>
  <button @click="nextPage2" :disabled="currentPage === totalPages - 1">다음</button>
</div>
  <button class="btn btn-primary" style="width: 400px;">문의하기</button>
</div>

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
      totalPages: 0,
      currentPage: 0,
      currentPage1: 0,
      mostViewPageSize: 3,
      inquirePageSize: 4
    }
  },
  computed: {
    popluarTotalPages () {
      return Math.ceil(this.popluarBoards.length / this.mostViewPageSize)
    },
    popluarVisbleBoards () {
      const startIndex = this.currentPage * this.mostViewPageSize
      return this.popluarBoards.slice(startIndex, startIndex + this.mostViewPageSize)
    },
    hasNextData () {
      const nextIndex = (this.currentPage + 1) * this.mostViewPageSize
      return nextIndex < this.popluarBoards.length
    },
    hasPreviousData () {
      return this.currentPage > 0
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
  selectCategory (category) {
    this.selectCategory = category
    this.filterCommunityList()
  },
  filterCommunityList () {
    if (this.selectCategory === '전체') {
      this.filterCommunityList = this.communityList
    } else {
      this.filterCommunityList = this.communityList.filter(
        community => community.category === this.selectCategory
      )
    }
  },
  mounted () {
    this.axiosPopularboards()
    this.axiosiquires()
    this.axiosCommunityList()
  },
  methods: {
    async axiosPopularboards () {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/popular')
        this.popluarBoards = response.data
      } catch (error) {
        console.error('인기글을 받아올 수 없습니다:', error)
      }
    },
    async axiosiquires () {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/community/Inquire')
        this.inquires = response.data
      } catch (error) {
        console.error('문의글을 받아올 수 없습니다:', error)
      }
    },
    async axiosCommunityList () {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/communityList?page=${this.currentPage}$size=${this.pageSize}`)
        this.communityList = response.data.content
        this.totalPages = response.data.totalPages
      } catch (err) {
        console.error('리스트를 불러올 수 없습니다:', err)
      }
    },
    async selectCategory (category) {
      try {
        if (category === '전체') {
          this.axiosCommunityList()
        } else {
          const response = await axios.get(`http://localhost:8080/api/v1/categoryPage/${category}`)
          this.communityList = response.data.content
        }
      } catch (error) {
        console.error('카테고리에 해당하는 게시물을 불러오는데 실패했습니다:', error)
      }
    },
    async searchCommunity () {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/community/Search?title=${this.searchQuery}`)
        this.communityList = response.date.content
        this.totalPages = response.data.totalPages
      } catch (err) {
        console.log('검색 실패:', err)
      }
    },
    nextPage2 () {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++
        this.axiosCommunityList()
      }
    },
    prevPage2 () {
      if (this.currentPage > 0) {
        this.currentPage--
        this.axiosCommunityList()
      }
    },
    nextPage () {
      if (this.currentPage < this.popluarTotalPages - 1 && this.hasNextData) {
        this.currentPage++
      }
    },
    prevPage () {
      if (this.currentPage > 0 && this.hasPreviousData) {
        this.currentPage--
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
    }
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
    background: url('../assets/images/left_arrow.png');
    text-indent: -9999px;
    margin-right: 5px; /* 화살표 간 간격 조정 */
  }
  .arrow-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url('../assets/images/right_arrow.png');
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
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 1000px;
  height: 100px;
  text-align: center;
  background-color: #f0f0f0;
}
.listInfo {
  display: flex;
  justify-content: left;
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
  </style>
