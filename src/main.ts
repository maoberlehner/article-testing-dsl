import type { Mock, QueueMock } from '../test/types';
import { mount } from './mount';

declare global {
  interface Window { appReady: boolean }
}

async function prepare() {
  if (process.env.NODE_ENV === `production`) return;

  let { rest, server } = await import(`../test/utils/msw-browser`);
  server.start();

  let queueMock: QueueMock = ({
    action,
    body,
    endpoint,
    status = 200,
  }) => {
    server.use(
      rest[action](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
    );
  };

  let mocksRaw = localStorage.getItem(`NETWORK_MOCKS`);
  let mocks: Mock[] = mocksRaw ? JSON.parse(mocksRaw) : [];
  mocks.forEach(mock => queueMock(mock));

  // During development, load preconditions for the use case you are working on.
  // await Promise.all([
  //   (await import(`./modules/article/__specs__/preconditions`))
  //     .userCanCreateNewArticle({ queueMock }),
  // ]);

  window.appReady = true;
}

prepare().then(mount);
