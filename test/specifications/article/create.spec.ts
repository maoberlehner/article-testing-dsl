import {
  userCanCreateNewArticle,
  userCanNotCreateNewArticle,
} from '../../modules/article/preconditions';
import { prepare } from '../../utils/preconditions';
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
  it(`should create a new article`, () => {
    goToCreateView();
    prepare(userCanCreateNewArticle);

    createNew();
    submit();

    assertSaved();
  });

  it(`should show an error message if creating a new article is not possible`, () => {
    goToCreateView();
    prepare(userCanNotCreateNewArticle);

    createNew();
    submit();

    assertError();
  });

  it.only(`should not allow saving incomplete data`, () => {
    goToCreateView();

    assertNoValidationErrors();
    createNew({ title: ``, body: `` });
    submit();

    assertPreventedSavingIncomplete();
  });
});
