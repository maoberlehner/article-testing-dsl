import { mount } from './mount';

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { server } = await import(`../test/utils/msw-browser`);
  server.start();

  let data = localStorage.getItem(`PRECONDITIONS`);
  let preconditions = data ? JSON.parse(data) : [];
  await Promise.all(preconditions.map(async (data) => {
    let {
      module,
      name,
      payload,
    } = JSON.parse(data);
    (await import(`./modules/${module}/__specs__/preconditions.ts`)).default[name].handler(payload);
  }));

  // Use those during developement.
  // await Promise.all([
  //   (await import(`./modules/article/__specs__/preconditions.ts`)).userCanCreateNewArticle(),
  // ]);

  window.appReady = true;
}

prepare().then(mount);
