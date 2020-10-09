import * as ACTION_TYPES from '../actions/action_types';

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
}

const initialState: AuthReducer = {
  isAuthenticated: false,
  profile: null
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
    default:
      return state;
  }
};

export default authReducer;