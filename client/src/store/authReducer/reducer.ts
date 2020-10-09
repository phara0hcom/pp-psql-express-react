import * as ACTION_TYPES from './actionTypes';

export type Profile = {
  nickname: string;
  picture: string;
  email: string;
  name: string;
  email_verified: boolean;
} | null;

export interface AuthReducer {
  isAuthenticated: boolean;
  profile: Profile;
  dbProfile: Profile;
}

const initialState: AuthReducer = {
  isAuthenticated: false,
  profile: null,
  dbProfile: null
};

const authReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: Profile;
  }
) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false
      };
    case ACTION_TYPES.ADD_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case ACTION_TYPES.REMOVE_PROFILE:
      return {
        ...state,
        profile: null
      };
    // new
    case ACTION_TYPES.SET_DB_PROFILE:
      return {
        ...state,
        dbProfile: action.payload
      };
    case ACTION_TYPES.REMOVE_DB_PROFILE:
      return {
        ...state,
        dbProfile: null
      };
    
    default:
      return state;
  }
};

export default authReducer;
