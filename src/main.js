import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App).use(store).use(router).use(BootstrapVue3).mount('#app')
import axios from 'axios'

const app = createApp(App)

// Axios를 Vue 인스턴스에 추가
app.config.globalProperties.$axios = axios

app.use(store)
app.use(router)

app.mount('#app')
