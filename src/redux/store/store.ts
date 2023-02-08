import {
  createStore as ReduxCreateStore,
  combineReducers,
} from "redux";
import { UsersReducer } from "../users/reducers";

export default function createStore() {
  return ReduxCreateStore(
    combineReducers({
      users: UsersReducer,
    })
  );
}