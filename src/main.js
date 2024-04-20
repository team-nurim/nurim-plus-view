// eslint-disable-next-line
/* eslint-disable */
import { createApp } from 'vue'; // Vue를 createApp으로 가져오기
import App from './App.vue';
import router from './router';

const app = createApp(App); // Vue 애플리케이션을 생성

app.use(router); // Vue 라우터를 앱에 등록
app.mount('#app'); // 앱을 마운트
