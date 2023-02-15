import * as Actions from './action';
import initialState from '../store/initialState';


export const MessageReducer = (state = initialState.message, action: any) => {
  switch (action.type) {
    case Actions.MESSAGE_OPEN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}