import {
  Precondition,
  PreconditionPayload,
  Run,
  Step,
} from './types';

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

export function prepare(precondition: Precondition, payload?: PreconditionPayload): void {
  cy.window().then(({ __MSW__, localStorage }) => {
    if (__MSW__) return precondition.handler({ ...payload, msw: __MSW__ });

    let data = localStorage.getItem(`PRECONDITIONS`);
    let preconditionData = data ? JSON.parse(data) : [];
    return localStorage.setItem(`PRECONDITIONS`, JSON.stringify([...preconditionData, JSON.stringify({
      module: precondition.module,
      name: precondition.name,
      payload,
    })]));
  });
}
