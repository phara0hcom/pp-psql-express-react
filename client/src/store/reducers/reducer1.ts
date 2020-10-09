import * as ACTION_TYPES from '../actions/action_types';

export interface Reducer1 {
  stateProp1: boolean;
}

const initialState: Reducer1 = {
  stateProp1: false
};

const reducer1 = (
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

export default reducer1;
