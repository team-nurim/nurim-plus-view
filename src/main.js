import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8080'

// Axios를 Vue 인스턴스에 추가
app.config.globalProperties.$axios = axios

app.use(store)
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')