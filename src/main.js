import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const app = createApp(App)

// Axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // 서버의 기본 URL 설정
  timeout: 10000 // 요청 타임아웃 설정 (예: 10초)
})

// Vue 인스턴스에 Axios 주입
app.config.globalProperties.$axios = axiosInstance

// 글로벌 mixin 정의
app.mixin({
  methods: {
    formatDate (dateString) {
      if (!dateString) return ''
      return dateString.split('T')[0]
    }
  }
})

app.use(store)
app.use(router)

app.mount('#app')
