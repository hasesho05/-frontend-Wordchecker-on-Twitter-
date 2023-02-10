import { createSelector } from 'reselect';

const usersSelector = (state:any) => state.users;

export const getUser = createSelector(
  [usersSelector],
  state => state.username
)

export const getSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)