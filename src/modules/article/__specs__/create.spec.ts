import { driver } from '../../../../test/drivers/switch';
import preconditionsArticle from './preconditions';
import {
  assertError,
  assertPreventedSavingIncomplete,
  assertNoValidationErrors,
  assertSaved,
  createNew,
  goToCreateView,
  submit,
} from './dsl';

describe(`Article: Create`, () => {
  it(`should create a new article`, driver.run([
    () => driver.prepare(preconditionsArticle.userCanCreateNewArticle),
    goToCreateView,
    createNew,
    submit,
    assertSaved,
  ]));

  it(`should show an error message if creating a new article is not possible`, driver.run([
    () => driver.prepare(preconditionsArticle.userCanNotCreateNewArticle),
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