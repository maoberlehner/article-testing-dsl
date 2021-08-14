import {
  assertError,
  assertNoValidationErrors,
  assertPreventedSavingIncomplete,
  assertSaved,
  createNew,
  goToCreateView,
  prepareUserCanCreateNewArticle,
  prepareUserCanNotCreateNewArticle,
  submit,
} from './dsl';

describe(`Article: Create`, () => {
  it(`should create a new article`, driver.run([
    prepareUserCanCreateNewArticle,
    goToCreateView,
    createNew,
    submit,
    assertSaved,
  ]));

  it(`should show an error message if creating a new article is not possible`, driver.run([
    prepareUserCanNotCreateNewArticle,
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
