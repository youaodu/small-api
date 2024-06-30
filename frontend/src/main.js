import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'


// 定义路由配置
const routes = [
    { path: '/', component: () => import('./pages/Home.vue') },
    // { path: '/about', component: () => import('./components/About.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    .mount('#app')
