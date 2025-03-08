import { createRouter, createWebHistory } from 'vue-router';

import Welcome from './pages/Welcome.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Cart from './pages/Cart.vue';
import Checkout from './pages/Checkout.vue';

const routes = [
    { path: '/', component: Welcome, meta: { title: '歡迎' } },
    { path: '/home', component: Home, meta: { title: '首頁' } },
    { path: '/login', component: Login, meta: { title: '登入' } },
    { path: '/cart', component: Cart, meta: { title: '購物車' } },
    { path: '/checkout', component: Checkout, meta: { title: '結帳' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.afterEach((to) => {
    document.title = to.meta.title || '';
});

export default router;
