<template>
  <div class="home">
    <!-- 헤더 섹션 -->
    <header class="app-header">
      <button class="menu-button">☰</button>
      <div class="search-container">
        <input type="search" placeholder="검색을 통해 찾아요..." class="search-input">
        <button class="search-button">🔍</button>
      </div>
      <div class="notification-container">
        <span class="notification-text">알림 + 1</span>
      </div>
    </header>

    <!-- 메인 콘텐츠 섹션 -->
    <main class="main-content">
      <div class="content-box">
        <p class="content-text">내가 받을 수 있는</p>
        <h1 class="content-header">지원금!</h1>
        <p class="content-text">과연 얼마..!?</p>
      </div>

    </main>

    <!-- 액션 버튼 섹션 -->
    <footer class="app-footer">
      <button class="interview-button">들어갈것</button> <br>
        <!-- '정책 매칭' 링크 버튼 -->
    <a href="/chat" class="interview-button-link">정책 매칭</a><br>
    <button @click="getData"> 호출된데이터부분</button><br>
<!-- 'new' 링크 버튼 -->
<a href="/Go" class="interview-button-link btn btn-primary">회원가입하고오세요</a>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  // Vue.js 데이터 및 메소드가 여기에 포함될 수 있습니다
  methods: {
    getData(){
      axios
      // 스프링컨트롤러에서 크로스오리진 등록했기에, 데이터호출
      .get('http://localhost:8080/')
      .then((response)=> {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
/* 전반적인 앱 디자인 */
#app {
  font-family: 'Roboto', sans-serif;
  color: #333;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
/* 데이터 호출부분 */

/* 헤더 스타일 */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.menu-button, .search-button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.search-container {
  position: relative;
}

.search-input {
  border: 2px solid #f0f0f0;
  border-radius: 20px;
  padding: 0.5em 1em;
  padding-right: 2.5em;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #007BFF;
}

.search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}

/* 메인 콘텐츠 스타일 */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
}

.content-box {
  text-align: center;
  animation: fadeIn 1s ease;
}

.content-text {
  color: #555;
  margin-bottom: 0.5em;
}

.content-header {
  color: #007BFF;
  margin-bottom: 0.5em;
}

/* 액션 버튼 스타일 */
.app-footer {
  padding: 1em;
  background: #f7f7f7;
}

.interview-button {
  width: 80%; /* 버튼의 가로 길이를 80%로 조정 */
  padding: 1em;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 70 auto; /* 가운데 정렬을 위해 자동 마진 설정 */
}

.interview-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* 애니메이션 효과 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
