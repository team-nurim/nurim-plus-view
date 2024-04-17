// eslint-disable-next-line
/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css' // BootstrapVue3 CSS도 추가해야합니다.
import axios from 'axios'

// Vue 애플리케이션 인스턴스를 생성
const app = createApp(App)

// 글로벌로 사용할 수 있게 axios를 설정
app.config.globalProperties.$axios = axios

// Vue 애플리케이션에 플러그인과 스토어 추가
app.use(store)
app.use(router)
app.use(BootstrapVue3)

// 애플리케이션을 페이지에 마운트
app.mount('#app')
