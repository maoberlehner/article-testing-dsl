import type { Precondition } from '../../../../test/types';
import articleDefault from './data/article-default.json';

const endpoint = `/api/articles`;

export const userCanCreateNewArticle: Precondition = ({ queueNetworkMock }) => queueNetworkMock({
  action: `post`,
  body: { data: articleDefault },
  endpoint,
});

export const userCanNotCreateNewArticle: Precondition = ({ queueNetworkMock }) => queueNetworkMock({
  action: `post`,
  body: { error: `Server error` },
  endpoint,
  status: 500,
});
