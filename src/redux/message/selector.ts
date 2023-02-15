import { createSelector } from 'reselect';

const messageSelector = (state:any) => state.message;

export const createMessage = createSelector(
  [messageSelector],
  state => state.message
)
