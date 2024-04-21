<template>
  <div id="app">
    <nav>
      <router-link to="/admin/members">Member List</router-link>

    </nav>
    <div class="content">
      <router-view />
      <div v-if="loading" class="loader"></div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    // 필요하다면 로딩 상태를 관리하는 메서드를 추가할 수 있습니다.
  }
};
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  text-align: center;
}

nav {
  background-color: #007bff;
  padding: 15px 0;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

.content {
  margin: 50px auto;
  width: 80%;
}

.loader {
  border: 5px solid #f3f3f3; /* 회색 */
  border-top: 5px solid #3498db; /* 파랑색 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 50px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
