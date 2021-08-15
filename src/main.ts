import type { NetworkMock, QueueNetworkMock } from '../test/types';
import { mount } from './mount';

declare global {
  interface Window { appReady: boolean }
}

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { rest, server } = await import(`../test/utils/msw-browser`);
  server.start();

  let queueNetworkMock: QueueNetworkMock = ({
    action,
    body,
    endpoint,
    status = 200,
  }) => {
    server.use(
      rest[action](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
    );
  };

  let networkMocksRaw = localStorage.getItem(`NETWORK_MOCKS`);
  let networkMocks: NetworkMock[] = networkMocksRaw ? JSON.parse(networkMocksRaw) : [];
  networkMocks.forEach(networkMock => queueNetworkMock(networkMock));

  // During development, load preconditions for the use case you are working on.
  // await Promise.all([
  //   (await import(`./modules/article/__specs__/preconditions`))
  //     .userCanCreateNewArticle({ queueNetworkMock }),
  // ]);

  window.appReady = true;
}

prepare().then(mount);
