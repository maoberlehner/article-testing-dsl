import { mount } from '@vue/test-utils';

import { Precondition, PreconditionPayload } from './types';
import { rest, server } from '../utils/msw-node';

import TheApp from '../../src/components/TheApp.vue';

const VIEW_MAP = {
  '/articles/create': TheApp,
};

// TODO parallel?
let wrapper = null;

function wait(duration = 1) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

function getElement(elementName) {
  return wrapper.find(`[data-qa="${elementName}"]`);
}

async function getElementRetry(elementName, {
  attempt = 1,
  maxAttempts = 3,
  waitDuration = 10,
} = {}) {
  let element = getElement(elementName);
  if (element.exists() || attempt > maxAttempts) return element;

  await wait(waitDuration);

  return getElementRetry(elementName, { attempt: attempt + 1 });
}

export function run(steps = []) {
  return async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (let step of steps) {
      // eslint-disable-next-line no-await-in-loop
      let result = await step();
      // eslint-disable-next-line no-await-in-loop
      if (Array.isArray(result)) await Promise.all(result.map(x => x()));
    }
  };
}

export async function goTo(view) {
  wrapper = mount(VIEW_MAP[view]);
  return wrapper;
}

export async function type(elementName, text) {
  return (await getElementRetry(elementName)).setValue(text);
}

export async function click(elementName) {
  return (await getElementRetry(elementName)).trigger(`click`);
}

export async function submit(elementName) {
  return (await getElementRetry(elementName)).trigger(`submit`);
}

export async function assertShouldExist(elementName) {
  return expect((await getElementRetry(elementName)).exists()).toBe(true);
}

export async function assertShouldNotExist(elementName) {
  return expect((await getElementRetry(elementName)).exists()).toBe(false);
}

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

export function prepare(precondition: Precondition, payload?: PreconditionPayload): void {
  precondition({ ...payload, msw: { rest, server } });
  // let isJest = process.env.JEST_WORKER_ID !== undefined;
  // if (isJest) {
  //   // TODO close when done

  // } else {
  //   cy.window().then(({ __MSW__ }) => {
  //     if (!__MSW__) throw new Error(`Make sure to load a page before preparing preconditions!`);
  //     precondition({ ...payload, msw: __MSW__ });
  //   });
  // }
}
