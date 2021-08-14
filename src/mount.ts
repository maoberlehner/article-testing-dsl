import { createApp, h } from 'vue';
import { createRouter, createWebHistory, RouterView } from 'vue-router';

import ArticlePageList from './modules/article/components/ArticlePageList.vue';
import PageHome from './components/PageHome.vue';

const routes = [
  { path: `/articles/create`, component: ArticlePageList },
  { path: `/`, component: PageHome },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function mount() {
  let app = createApp({ render: () => h(RouterView) });
  app.use(router);
  app.mount(`#app`);
}
