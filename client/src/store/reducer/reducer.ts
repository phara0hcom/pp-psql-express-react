import * as ACTION_TYPES from './actionTypes';

export interface Reducer {
  stateProp1: boolean;
}

const initialState: Reducer = {
  stateProp1: false
};

const reducer = (
  state = initialState,
  action: {
    type: string;
  }
) => {
  switch (action.type) {
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        stateProp1: true
      };
    case ACTION_TYPES.FAILURE:
      return {
        ...state,
        stateProp1: false
      };
    default:
      return state;
  }
};

export default reducer;
