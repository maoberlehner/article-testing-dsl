import {
  QueueNetworkMock,
  Run,
  Step,
} from '../types';

export const run: Run = (steps: Step[] = []) => () => {
  // eslint-disable-next-line no-restricted-syntax
  for (let step of steps) {
    let result = step();
    if (Array.isArray(result)) result.forEach(x => x());
  }
};

export function goTo(view) {
  cy.visit(view);
  cy.window().should(`have.property`, `appReady`, true);
}

export function getElement(elementName) {
  return cy.get(`[data-qa="${elementName}"]`);
}

export function type(elementName, text) {
  getElement(elementName).type(text);
}

export function click(elementName) {
  getElement(elementName).click();
}

export function submit(elementName) {
  getElement(elementName).submit();
}

function should(elementName, condition) {
  return getElement(elementName).should(condition);
}

export function assertShouldExist(elementName) {
  should(elementName, `exist`);
}

export function assertShouldNotExist(elementName) {
  should(elementName, `not.exist`);
}

export const queueNetworkMock: QueueNetworkMock = ({
  action,
  body,
  endpoint,
  status = 200,
}) => {
  cy.window().then(({ __MSW__: msw, localStorage }) => {
    if (msw) {
      return msw.server.use(
        msw.rest[action](endpoint, (req, res, ctx) => res(ctx.status(status), ctx.json(body))),
      );
    }

    let networkMocksRaw = localStorage.getItem(`NETWORK_MOCKS`);
    let networkMocks = networkMocksRaw ? JSON.parse(networkMocksRaw) : [];
    return localStorage.setItem(`NETWORK_MOCKS`, JSON.stringify([...networkMocks, JSON.stringify({
      action,
      body,
      endpoint,
      status,
    })]));
  });
};
