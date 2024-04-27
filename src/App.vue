// eslint-disable-next-line
/* eslint-disable */
<template>
  <div id="app">
    <component :is="headerComponent" />
      <router-view/>
    <Footer />
  </div>
</template>
<script>
import HeaderAdmin from './layout/HeaderAdmin.vue'
import Header from './components/common/NurimHeader.vue'
import Footer from './components/common/NurimFooter.vue'

export default {
  // eslint-disable-next-line
/* eslint-disable */
  components: { HeaderAdmin, Footer, Header },
  computed: {
    headerComponent() {
      // '/admin' 경로에 대한 헤더 컴포넌트 선택
      if (this.$route.path.startsWith('/admin') && !this.$route.path.startsWith('/admin/login')) {
        return 'HeaderAdmin';
      } else {
        // 기본값으로 헤더 컴포넌트 선택
        return 'Header';
      } 
    }
  }
}
// eslint-disable-next-line
/* eslint-disable */
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  text-align: center;
  color: #333
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

h1 {
  font-weight: 700;
  line-height: 1.5 !important;
}

h2 {
  font-weight: 700;
  line-height: 1.5 !important;
}

h3 {
  font-weight: 700;
  line-height: 1.5 !important;
}

h4 {
  font-weight: 700;
  line-height: 1.5 !important;
}

h5 {
  font-weight: 700;
  line-height: 1.5 !important;
}


h6 {
  font-weight: 700;
  line-height: 1.5 !important;
}

.btn-primary {
  font-weight: 500;
  background-color: #2F80ED;
}

</style>
