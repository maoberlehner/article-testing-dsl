import { driver } from '../../drivers/switch';

export function goToCreateView() {
  return driver.goTo(`/articles/create`);
}

export function createNew({ body = `Foo bar`, title = `Foo` } = {}) {
  let steps = [];
  if (title) steps.push(() => driver.type(`title field`, title));
  if (body) steps.push(() => driver.type(`body field`, body));

  return steps;
}

export function submit() {
  return driver.submit(`form`);
}

export function assertSaved() {
  return driver.assertShouldExist(`success info`);
}

export function assertError() {
  return driver.assertShouldExist(`error info`);
}

export function assertPreventedSavingIncomplete() {
  return driver.assertShouldExist(`validation error title`);
}

export function assertNoValidationErrors() {
  return driver.assertShouldNotExist(`validation error title`);
}
