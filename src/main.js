import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import './assets/css/global.css';
// import './assets/css/home.css';
// import './assets/css/login.css';
// import './assets/css/cart.css';
// import './assets/css/checkout.css';
import './assets/tailwind.css';

const app = createApp(App);
app.use(router);
app.mount('#app');