import { createApp } from 'vue';

import TheApp from './components/TheApp.vue';

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { server } = await import(`../test/utils/browser`);
  server.start();

  // Use those during developement.
  // await Promise.all([
  //   (await import(`../test/modules/article/preconditions`)).userCanCreateNewArticle(),
  // ]);

  window.appReady = true;
}

prepare().then(() => createApp(TheApp).mount(`#app`));
