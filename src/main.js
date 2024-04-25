// eslint-disable-next-line
/* eslint-disable */
import { createApp } from 'vue'; // Vue를 createApp으로 가져오기
import App from './App.vue';
import router from './router';
import store from './store/index'
import axios from 'axios'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App); // Vue 애플리케이션을 생성

// app.use(router); // Vue 라우터를 앱에 등록
// app.mount('#app'); // 앱을 마운트
axios.defaults.baseURL = 'http://localhost:8080'

// Axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 10000,
});

// Vue 인스턴스에 Axios 주입
app.config.globalProperties.$axios = axiosInstance;

// 글로벌 mixin 정의
app.mixin({
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      return dateString.split("T")[0];
    },
  },
});

app.use(store);
app.use(router);
app.use(BootstrapVue3);

app.mount("#app");
