import { createSelector } from 'redux-starter-kit';

export const makeSelectRepo = createSelector(
  ['repo'],
  repo => repo,
);
