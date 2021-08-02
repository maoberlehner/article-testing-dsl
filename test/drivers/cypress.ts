import { Precondition, PreconditionPayload } from './types';

export function run(steps = []) {
  return () => {
    // eslint-disable-next-line no-restricted-syntax
    for (let step of steps) {
      let result = step();
      if (Array.isArray(result)) result.forEach(x => x());
    }
  };
}

export function goTo(view) {
  cy.visit(view);
  cy.window().should(`have.property`, `appReady`, true);
}

export function getElement(elementName) {
  return cy.get(`[data-qa="${elementName}"]`);
}

export function type(elementName, text) {
  return getElement(elementName).type(text);
}

export function click(elementName) {
  return getElement(elementName).click();
}

export function submit(elementName) {
  return getElement(elementName).submit();
}

function should(elementName, condition) {
  return getElement(elementName).should(condition);
}

export function assertShouldExist(elementName) {
  return should(elementName, `exist`);
}

export function assertShouldNotExist(elementName) {
  return should(elementName, `not.exist`);
}

export function prepare(precondition: Precondition, payload?: PreconditionPayload): void {
  cy.window().then(({ __MSW__ }) => {
    // TODO go to about:blank if no page?!
    if (!__MSW__) throw new Error(`Make sure to load a page before preparing preconditions!`);
    precondition({ ...payload, msw: __MSW__ });
  });
}