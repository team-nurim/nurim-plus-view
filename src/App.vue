<template>
  <div id="app">
    <HeaderAdmin />
    <div class="router-view-container">
      <router-view/>
    </div>
    <FooterAdmin />
  </div>
</template>
<script>
import HeaderAdmin from './layout/HeaderAdmin.vue'
import FooterAdmin from './layout/FooterAdmin.vue'
export default {
  components: { HeaderAdmin, FooterAdmin }
}
// eslint-disable-next-line
/* eslint-disable */
</script>
<style>
#app {
   display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-view-container {
  flex: 1;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
