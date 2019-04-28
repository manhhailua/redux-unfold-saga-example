import { createReducer } from 'redux-starter-kit';
import { createActionTypeOnSuccess } from 'redux-unfold-saga';

import { FETCH_REPO_INFO } from './actions';

const repo = createReducer(
  {},
  {
    [createActionTypeOnSuccess(FETCH_REPO_INFO)]: (state, action) =>
      action.payload,
  },
);

const rootReducer = {
  repo,
};

export default rootReducer;
