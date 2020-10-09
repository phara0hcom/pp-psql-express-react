import * as ACTION_TYPES from '../actions/action_types';

export interface UserReducer {
  userText: string;
}

const initialState = {
  userText: ''
};

const userReducer = (
  state = initialState,
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case ACTION_TYPES.USER_INPUT:
      return {
        ...state,
        userText: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
