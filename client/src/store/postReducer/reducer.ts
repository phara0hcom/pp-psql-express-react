import * as ACTION_TYPES from './actionTypes';

export interface PostReducer {
  posts: Array<any>;
  comments: Array<any>;
}

const initialState: PostReducer = {
  posts: [],
  comments: []
};

const postReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: any;
  }
) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DB_POST:
      return {
        ...state,
        posts: action.payload
      };
    case ACTION_TYPES.REMOVE_DB_POST:
      return {
        ...state,
        posts: []
      };
    case ACTION_TYPES.FETCH_DB_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ACTION_TYPES.REMOVE_DB_POST_COMMENTS:
      return {
        ...state,
        comments: []
      };

    default:
      return state;
  }
};

export default postReducer;
