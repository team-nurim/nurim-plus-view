import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = "http://localhost:8080"

// Axios를 Vue 인스턴스에 추가
app.config.globalProperties.$axios = axios

app.use(store)
app.use(router)

app.mount('#app')
