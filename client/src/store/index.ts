import reducer, { Reducer } from './reducer/reducer';
import authReducer, { AuthReducer } from './authReducer/reducer';
import userReducer, { UserReducer } from './userReducer/reducer';
import { combineReducers } from 'redux';

export interface RootState {
  reducer: Reducer;
  authReducer: AuthReducer;
  userReducer: UserReducer;
}

const rootReducer = combineReducers({
  reducer,
  authReducer,
  userReducer
});

export default rootReducer;
