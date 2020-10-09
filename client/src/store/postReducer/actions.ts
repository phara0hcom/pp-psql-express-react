import * as ACTION_TYPES from './actionTypes';

// TODO set correct type for post
export const fetchDbPost = (post: any) => {
  return {
    type: ACTION_TYPES.FETCH_DB_POST,
    payload: post
  };
};

export const removeDbPost = () => {
  return {
    type: ACTION_TYPES.REMOVE_DB_POST
  };
};
// TODO set correct type for comments
export const fetchDbPostComment = (comments: any) => {
  return {
    type: ACTION_TYPES.FETCH_DB_POST_COMMENTS,
    payload: comments
  };
};

export const removeDbPostComment = () => {
  return {
    type: ACTION_TYPES.REMOVE_DB_POST_COMMENTS
  };
};
