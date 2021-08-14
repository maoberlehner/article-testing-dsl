import type { Precondition } from '../../../../test/drivers/types';
import articleDefault from './data/article-default.json';

const MODULE = `article`;

const userCanCreateNewArticle: Precondition = {
  handler({
    data = articleDefault,
    msw,
  // eslint-disable-next-line no-underscore-dangle
  } = { msw: window.__MSW__ }): void {
    msw.server.use(
      msw.rest.post(`/api/articles`, async (req, res, ctx) => res(ctx.status(200), ctx.json({ data }))),
    );
  },
  module: MODULE,
  name: `userCanCreateNewArticle`,
};

const userCanNotCreateNewArticle: Precondition = {
  handler({
    msw,
  // eslint-disable-next-line no-underscore-dangle
  } = { msw: window.__MSW__ }): void {
    msw.server.use(
      msw.rest.post(`/api/articles`, async (req, res, ctx) => res(ctx.status(500), ctx.json({ error: `Server error` }))),
    );
  },
  module: MODULE,
  name: `userCanNotCreateNewArticle`,
};

export default {
  [userCanCreateNewArticle.name]: userCanCreateNewArticle,
  [userCanNotCreateNewArticle.name]: userCanNotCreateNewArticle,
};
