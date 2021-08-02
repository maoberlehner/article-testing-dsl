import { mount } from './mount';

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { server } = await import(`../test/utils/msw-browser`);
  server.start();

  // Use those during developement.
  // await Promise.all([
  //   (await import(`../test/modules/article/preconditions`)).userCanCreateNewArticle(),
  // ]);

  window.appReady = true;
}

prepare().then(mount);
