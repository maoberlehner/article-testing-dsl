import { rest, setupWorker } from 'msw';

export { rest } from 'msw';

export const server = setupWorker();

export type WindowMsw = { rest: typeof rest, server: typeof server }

declare global {
  interface Window { __MSW__: WindowMsw }
}

// eslint-disable-next-line no-underscore-dangle
window.__MSW__ = {
  rest,
  server,
};
