import { createApp } from 'vue';
import './style.css';
import 'animate.css';
import App from './App.vue';
import '@utils/icon';
import router from '@/router';
import { dIcon } from '@components/vue';
// import { ids } from '@utils/icon';

const app = createApp(App);
app.use(router);
app.component('d-icon', dIcon);
app.mount('#app');
