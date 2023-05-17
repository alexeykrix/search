import { createWebHistory, createRouter } from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/search/:slug', name: 'search', component: Search, props: true },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;