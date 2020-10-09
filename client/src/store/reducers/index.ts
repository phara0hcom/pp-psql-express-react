import reducer1, { Reducer1 } from './reducer1';
import authReducer, { AuthReducer } from './authReducer';
import userReducer, { UserReducer } from './userReducer';
import { combineReducers } from 'redux';

export interface RootState {
  reducer1: Reducer1;
  authReducer: AuthReducer;
  userReducer: UserReducer;
}

const rootReducer = combineReducers({
  reducer1,
  authReducer,
  userReducer,
});

export default rootReducer;
