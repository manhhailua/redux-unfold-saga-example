import { createAction } from 'redux-unfold-saga';

export const FETCH_REPO_CONTRIBUTORS = 'FETCH_REPO_CONTRIBUTORS';
export const FETCH_REPO_INFO = 'FETCH_REPO_INFO';

export const fetchRepoContributors = createAction(FETCH_REPO_CONTRIBUTORS);
export const fetchRepoInfo = createAction(FETCH_REPO_INFO);
