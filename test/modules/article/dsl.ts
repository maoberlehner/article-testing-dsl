export function goToCreateView(): void {
  cy.visit(`/articles/create`);
  cy.window().should(`have.property`, `appReady`, true);
}

export function createNew({ body = `Foo bar`, title = `Foo` } = {}): void {
  if (title) cy.get(`[data-qa="title field"]`).type(title);
  if (body) cy.get(`[data-qa="body field"]`).type(body);
}

export function submit(): void {
  cy.get(`[data-qa="submit button"]`).click();
}

export function assertSaved(): void {
  cy.get(`[data-qa="success info"]`).should(`exist`);
}

export function assertError(): void {
  cy.get(`[data-qa="error info"]`).should(`exist`);
}

export function assertPreventedSavingIncomplete(): void {
  cy.get(`[data-qa="validation error title"]`).should(`exist`);
}

export function assertNoValidationErrors(): void {
  cy.get(`[data-qa="validation error title"]`).should(`not.exist`);
}
