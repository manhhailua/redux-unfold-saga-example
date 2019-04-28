import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga } from 'redux-unfold-saga';

import { FETCH_REPO_CONTRIBUTORS, FETCH_REPO_INFO } from './actions';

export function* takeFetchRepoContributors({ callbacks }) {
  yield unfoldSaga(
    {
      handler: async () => {
        const { data } = await axios.get(
          'https://api.github.com/repos/manhhailua/redux-unfold-saga/contributors',
        );
        return data;
      },
      key: FETCH_REPO_CONTRIBUTORS,
    },
    callbacks,
  );
}

export function* takeFetchRepoInfo() {
  yield unfoldSaga(
    // body
    {
      handler: async () => {
        const { data } = await axios.get(
          'https://api.github.com/repos/manhhailua/redux-unfold-saga',
        );
        return data;
      },
      key: FETCH_REPO_INFO,
    },
    // callbacks
    {
      onSuccess: data => {
        console.log(data);
      },
    },
  );
}

export default function* rootSaga() {
  yield takeLatest(FETCH_REPO_CONTRIBUTORS, takeFetchRepoContributors);
  yield takeLatest(FETCH_REPO_INFO, takeFetchRepoInfo);
}
