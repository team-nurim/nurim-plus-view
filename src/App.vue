<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">정책정보</router-link> |
    <router-link to="/about">지원추천</router-link> |
    <router-link to="/about">커뮤니티</router-link>
  </nav>
  <router-view/> -->
  <Header></Header>
  <router-view />
  <Footer></Footer>
</template>

<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 98vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

Footer {
  margin-top: auto;;
}

</style>
