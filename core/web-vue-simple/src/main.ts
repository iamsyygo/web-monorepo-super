import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@utils/icon';
import { ids } from '@utils/icon';
console.log(ids, 'ids');

createApp(App).mount('#app');
