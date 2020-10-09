import reducer, { Reducer } from './reducer/reducer';
import authReducer, { AuthReducer } from './authReducer/reducer';
import postReducer, { PostReducer } from './postReducer/reducer';
import userReducer, { UserReducer } from './userReducer/reducer';
import { combineReducers } from 'redux';

export interface RootState {
  reducer: Reducer;
  authReducer: AuthReducer;
  postReducer: PostReducer;
  userReducer: UserReducer;
}

const rootReducer = combineReducers({
  reducer,
  authReducer,
  postReducer,
  userReducer
});

export default rootReducer;
