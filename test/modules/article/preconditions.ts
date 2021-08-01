const DEFAULT_ARTICLE = {
  body: `Foo bar`,
  title: `Foo`,
};

export function userCanCreateNewArticle({
  data = DEFAULT_ARTICLE,
  // eslint-disable-next-line no-underscore-dangle
  msw = window.__MSW__,
} = {}): void {
  msw.server.use(
    msw.rest.post(`/api/articles`, async (req, res, ctx) => res(ctx.status(200), ctx.json({ data }))),
  );
}

export function userCanNotCreateNewArticle({
  // eslint-disable-next-line no-underscore-dangle
  msw = window.__MSW__,
} = {}): void {
  msw.server.use(
    msw.rest.post(`/api/articles`, async (req, res, ctx) => res(ctx.status(500), ctx.json({ error: `Server error` }))),
  );
}
