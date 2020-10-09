import * as ACTION_TYPES from './actionTypes';

export const user_input = (text: string) => {
  return {
    type: ACTION_TYPES.USER_INPUT,
    payload: text
  };
};
