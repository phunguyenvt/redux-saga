import { all, fork } from 'redux-saga/effects';

import watchTopicsSaga from './watchers/topics';
import watchGetCategorySaga from './watchers/category';

export default function* root() {
  yield all([
    fork(watchTopicsSaga),
    fork(watchGetCategorySaga),
  ]);
}
