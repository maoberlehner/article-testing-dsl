import type { Step } from '../../drivers/types';
import { driver } from '../../drivers/switch';

export const goToCreateView: Step = () => driver.goTo(`/articles/create`);

export const createNew = ({ body = `Foo bar`, title = `Foo` } = {}): Step[] => {
  let steps = [];
  if (title) steps.push(() => driver.type(`title field`, title));
  if (body) steps.push(() => driver.type(`body field`, body));

  return steps;
};

export const submit: Step = () => driver.submit(`form`);

export const assertSaved: Step = () => driver.assertShouldExist(`success info`);

export const assertError: Step = () => driver.assertShouldExist(`error info`);

export const assertPreventedSavingIncomplete: Step = () => driver.assertShouldExist(`validation error title`);

export const assertNoValidationErrors: Step = () => driver.assertShouldNotExist(`validation error title`);
