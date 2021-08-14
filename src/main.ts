import { mount } from './mount';

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { rest, server } = await import(`../test/utils/msw-browser`);
  server.start();

  let networkMocksRaw = localStorage.getItem(`NETWORK_MOCKS`);
  let networkMocks = networkMocksRaw ? JSON.parse(networkMocksRaw) : [];
  await Promise.all(networkMocks.map(async (data) => {
    let {
      action,
      body,
      endpoint,
      status,
    } = JSON.parse(data);
    server.use(
      rest[action](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
    );
  }));

  window.appReady = true;
}

prepare().then(mount);
