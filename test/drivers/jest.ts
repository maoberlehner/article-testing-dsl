import {
  configure,
  findByTestId as findByTestIdOriginal,
  fireEvent,
  queryByTestId as queryByTestIdOriginal,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import {
  QueueNetworkMock,
  Run,
  Step,
} from '../types';
import { rest, server } from '../utils/msw-node';

configure({
  testIdAttribute: `data-qa`,
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

export const run: Run = (steps: Step[] = []) => async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (let step of steps) {
    // eslint-disable-next-line no-await-in-loop
    let result = await step();
    // eslint-disable-next-line no-await-in-loop
    if (Array.isArray(result)) await Promise.all(result.map(x => x()));
  }
};

function findByTestId(testId) {
  return findByTestIdOriginal(document, testId);
}

function queryByTestId(testId) {
  return queryByTestIdOriginal(document, testId);
}

export async function goTo(view) {
  jsdom.reconfigure({ url: `http://localhost:3000${view}` });
  document.body.innerHTML = `<div id="app"></div>`;
  let { mount } = await import(`../../src/mount`);
  return mount();
}

export async function type(testId, text) {
  return userEvent.type(await findByTestId(testId), text);
}

export async function click(testId) {
  return userEvent.click(await findByTestId(testId));
}

export async function submit(testId) {
  return fireEvent.submit(await findByTestId(testId));
}

export async function assertShouldExist(testId) {
  return expect(await findByTestId(testId)).toBeTruthy();
}

export async function assertShouldNotExist(testId) {
  return expect(queryByTestId(testId)).toBeFalsy();
}

export const queueNetworkMock: QueueNetworkMock = ({
  action,
  body,
  endpoint,
  status = 200,
}) => {
  server.use(
    rest[action](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
  );
};
