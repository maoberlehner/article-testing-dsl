import {
  AssertShouldExist,
  AssertShouldNotExist,
  Click,
  GoTo,
  QueueNetworkMock,
  Run,
  Step,
  Submit,
  TestId,
  Type,
} from '../types';

export const run: Run = (steps: Step[] = []) => () => {
  // eslint-disable-next-line no-restricted-syntax
  for (let step of steps) {
    let result = step();
    if (Array.isArray(result)) result.forEach(x => x());
  }
};

export const goTo: GoTo<void> = (view) => {
  cy.visit(view);
  cy.window().should(`have.property`, `appReady`, true);
};

const getElement = (testId: TestId) => cy.get(`[data-qa="${testId}"]`);

export const type: Type<void> = (testId, text) => {
  getElement(testId).type(text);
};

export const click: Click<void> = (testId) => {
  getElement(testId).click();
};

export const submit: Submit<void> = (testId) => {
  getElement(testId).submit();
};

function should(testId: TestId, condition: string) {
  return getElement(testId).should(condition);
}

export const assertShouldExist: AssertShouldExist<void> = (testId) => {
  should(testId, `exist`);
};

export const assertShouldNotExist: AssertShouldNotExist<void> = (testId) => {
  should(testId, `not.exist`);
};

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
    return localStorage.setItem(`NETWORK_MOCKS`, JSON.stringify([...networkMocks, {
      action,
      body,
      endpoint,
      status,
    }]));
  });
};
