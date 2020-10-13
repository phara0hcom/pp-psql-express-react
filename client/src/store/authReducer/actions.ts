import * as ACTION_TYPES from './actionTypes';
import { Profile } from './reducer';

export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  };
};

export const addProfile = (profile: Profile | {}) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  };
};

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  };
};

export const setDbProfile = (profile: Profile) => {
  return {
    type: ACTION_TYPES.SET_DB_PROFILE,
    payload: profile
  };
};

export const removeDbProfile = () => {
  return {
    type: ACTION_TYPES.REMOVE_DB_PROFILE
  };
};
