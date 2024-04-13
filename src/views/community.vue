<template>
      <div class="container">
        <h1 class="title" style="font-weight: bold">무엇이든 물어보세요</h1>
        <p class="subtitle">어디에 어떻게 물어볼지 모르겠다면 여기에</p>
      </div>
      <!--가장많이 본 게시물 -->
      <div class="favorite-container">
        <div class="favorite-header">
        <h3 class="favoriteboards-title">가장많이 본 게시물</h3>
        <div class="arrow-buttons">
          <a @click="prevPage" :disabled="currentPage === 0" class="arrow-button1">‹</a>
          <a @click="nextPage" :disabled="currentPage === totalPages - 1" class="arrow-button">›</a>
        </div>
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
      <div class="inquire-header">
        <h3 class="inquire-title">답변을 기다리는 게시물</h3>
        <div class="arrow-buttons">
          <a @click="InsqireprevPage" :disabled="currentPage === 0" class="arrow-button1">‹</a>
          <a @click="InsqirenextPage" :disabled="currentPage === totalPages - 1" class="arrow-button">›</a>
        </div>
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
     <!-- 게시물 리스트 -->
  <div class="list-container" style="display: grid;">
    <div v-for="(community, index) in communityList" :key="index" class="List-card" style="place-items: center;">
      <div class="listInfo">
        <p>닉네임:{{ community.memberNickname }}</p>
        <p>등록일:{{ formatDate(community.registerDate) }}</p>
        <p>조회수:{{ community.counts }}</p>
      </div>
        <p>{{ community.title }}</p>
        </div>
      </div>
    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage2" :disabled="currentPage === 0">이전</button>
      <button @click="nextPage2" :disabled="currentPage === totalPages - 1">다음</button>
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
    margin-left: auto; /* 화살표를 오른쪽으로 이동 */
    display: flex;
    justify-content: flex-end;
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
    display: flex;
    align-items: center;
    margin-bottom: 0px; /* 인기글과 화살표 간 간격 조정 */
    width: 1350px;
    margin-left: 300px;
  }
  .favoriteboards-title {
    font-size: 30px;
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
  .inquire-title{
    font-size: 30px;
    margin-right: auto;
  }
  .inquire-header {
    display: flex;
    align-items: center;
    margin-bottom: 0px; /* 인기글과 화살표 간 간격 조정 */
    width: 1300px;
    margin-left: 300px;
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
    width: calc(33.33% - 40px); /* 가로 여백 제외한 1/3 너비로 설정 */
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    margin-left: 20px;
    }
    .inquire-title{
      font-size: 20px;
      text-align: start;
    }
    .category {
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px; /* 원하는 둥근 정도로 조절 */
  background-color: #ccc; /* 배경색 설정 */
  padding: 5px 10px; /* 카테고리 내부 패딩 설정 */
}
   /*====================================================================================*/
   /* 카드 스타일링 */
   .list-container {
  justify-content: center;
}

.List-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 1000px;
  height: 100px;
  text-align: center;
}
.listInfo {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: space-between; /* 요소들을 가로로 균등하게 배치 */
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

/* 페이지네이션 스타일링 */
.pagination {
  margin-top: 20px;
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
  </style>
