<template>
    <div>
      <div class="container">
        <h1 class="title">무엇이든 물어보세요</h1>
        <p class="subtitle">어디에 어떻게 물어볼지 모르겠다면 여기에!</p>
      </div>
      <div class="favorite-container">
        <p class="favoriteboards">가장 많이 본 게시물</p>
        <div v-for="(community, index) in mostViewedPosts" :key="index">
          <h2>{{ community.title }}</h2>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios'
const apiUrl = 'http://localhost:8080/api/v1/popular'
export default {
  name: 'CommunityView',
  data () {
    return {
      mostViewedPosts: []
    }
  },
  mounted () {
    this.fetchMostViewedPosts()
  },
  methods: {
    async fetchMostViewedPosts () {
      try {
        const response = await axios.get(apiUrl)
        this.mostViewedPosts = response.data
      } catch (error) {
        console.error('Error fetching most viewed posts:', error)
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
  .subtitle {
    margin-top: 20px; /* 서브타이틀 위 여백 추가 */
  }
  .favoriteboards {
    font-size: 30px;
  }
  .favorite-container {
    padding: 20px;
  }
  .card {
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
  </style>
