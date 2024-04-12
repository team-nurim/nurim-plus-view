<template>
    <div>
      <div class="container">
        <h1 class="title" style="font-weight: bold">무엇이든 물어보세요</h1>
        <p class="subtitle">어디에 어떻게 물어볼지 모르겠다면 여기에</p>
      </div>
      <div class="favorite-container">
        <p class="favoriteboards">인기글</p>
        <div class="card-container">
        <div v-for="(community, index) in popluarBoards" :key="index" class="card">
          <h2>{{ community.title }}</h2>
          <p>{{community.content}}</p>
          <p>{{community.counts}}</p>
          <p>{{community.registerDate}}</p>
          <p>{{community.memberNickname}}</p>
          </div>
        </div>
      </div>
      <div class="inquire-container">문의글</div>
      <div class="card-container">
      <div v-for="(inquire, index) in inquires" :key="index" class="card">
        <p>{{ inquire.category }}</p>
        <p>{{ inquire.title }}</p>
        <p>{{ inquire.content }}</p>
        </div>
      </div>
      <div class="section-list">
    <div class="category-search">
      <div class="category-buttons">
        <button class="category-button">보육</button>
        <button class="category-button">출산/양육</button>
        <button class="category-button">주거</button>
        <button class="category-button">장례</button>
      </div>
      <div class="search-container">
  <input type="text" placeholder="검색어를 입력하세요" class="search-input">
  <button class="search-button"></button>
</div>
    </div>
  </div>
</div>
  </template>
<script>
import axios from 'axios'
export default {
  name: 'CommunityView',
  data () {
    return {
      popluarBoards: [],
      inquires: []
    }
  },
  mounted () {
    this.axiosPopularboards()
    this.axiosiquires()
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
    }
  }
}
</script>
  <style>
  .container {
    width: 100%;
    height: 28vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    padding-top: 60px;
  }
  .title, .subtitle {
    text-align: center; /* 가로 방향으로 중앙 정렬 */
  }
  .title{
    font-size: 52px;
  }
  .subtitle {
    font-size: 16px;
    margin-top: 20px; /* 서브타이틀 위 여백 추가 */
  }
  .favoriteboards {
    font-size: 30px;
  }
  .favorite-container {
    padding: 20px;
  }
  .inquire-container{
    font-size: 26px;
    font-weight: bold;
  }
  .card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  }
  .card {
    width: calc(18% - 20px); /* 가로 여백 제외한 1/3 너비로 설정 */
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }
  .card h2 {
    font-size: 24px;
    color: #333;
  }
  .card p {
    font-size: 16px;
    color: #666;
  }
  .favoriteboards{
    font-size: 26px;
    font-family: fantasy;
    font-weight: bold;
  }
  .section-list {
  display: flex;
  justify-content: center;
}

.category-search {
  display: flex;
  align-items: center;
}

.category-buttons {
  display: flex;
  gap: 10px; /* 각 버튼 사이의 간격 조절 */
}

.category-button {
  font-size: 16px;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;
}

.search-container {
  display: flex;
  align-items: center;
  margin-left: 100px;
}

.search-input {
  padding: 5px;
  margin-left: 10px;
}

.search-button {
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.search-button i {
  color: #666;
  font-size: 18px;
}

.search-button:hover i {
  color: #333; /* 마우스를 올렸을 때 아이콘의 색상 변경 */
}

  </style>
