import { driver } from '../../drivers/switch';
import {
  userCanCreateNewArticle,
  userCanNotCreateNewArticle,
} from '../../modules/article/preconditions';
import {
  assertError,
  assertPreventedSavingIncomplete,
  assertNoValidationErrors,
  assertSaved,
  createNew,
  goToCreateView,
  submit,
} from '../../modules/article/dsl';

describe(`Article: Create`, () => {
  it(`should create a new article`, driver.run([
    goToCreateView,
    // TODO das muss vorher auch gehen, falls gleich bei mount ein request gemacht wird
    () => driver.prepare(userCanCreateNewArticle),
    createNew,
    submit,
    assertSaved,
  ]));

  it(`should show an error message if creating a new article is not possible`, driver.run([
    goToCreateView,
    () => driver.prepare(userCanNotCreateNewArticle),
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
