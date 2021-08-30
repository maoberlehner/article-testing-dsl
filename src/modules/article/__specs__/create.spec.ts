import {
  assertError,
  assertNoValidationErrors,
  assertPreventedSavingIncomplete,
  assertSaved,
  createNew,
  goToCreateView,
  submit,
} from './dsl';
import {
  userCanCreateNewArticle,
  userCanNotCreateNewArticle,
} from './preconditions';

describe(`Article: Create`, () => {
  it(`should create a new article`, driver.run([
    () => driver.prepare(userCanCreateNewArticle),
    goToCreateView,
    createNew,
    submit,
    assertSaved,
  ]));

  it(`should show an error message if creating a new article is not possible`, driver.run([
    () => driver.prepare(userCanNotCreateNewArticle),
    goToCreateView,
    createNew,
    submit,
    assertError,
  ]));

  it(`should not allow saving incomplete data`, driver.run([
    goToCreateView,
    assertNoValidationErrors,
    () => createNew({ title: ``, body: `` }),
    submit,
    assertPreventedSavingIncomplete,
  ]));
});
