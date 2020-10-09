import React from 'react';
import { connect, useDispatch, ConnectedProps } from 'react-redux';

import * as ACTIONS from '../store/actions/actions';
import { RootState } from '../store/reducers';

const mapStateToProps = (state: RootState) => {
  return {
    stateProp1: state.reducer1.stateProp1,
    userText: state.userReducer.userText,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Container1: React.FC<PropsFromRedux> = ({ stateProp1, userText }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => console.log(stateProp1)}> Get State </button>
      <button onClick={() => dispatch(ACTIONS.SUCCESS)}>
        Dispatch Action 1{' '}
      </button>
      <button onClick={() => dispatch(ACTIONS.FAILURE)}>
        Dispatch Action 2{' '}
      </button>
      <button onClick={() => dispatch(ACTIONS.success())}>
        Dispatch Action Creator 1{' '}
      </button>
      <button onClick={() => dispatch(ACTIONS.failure())}>
        Dispatch Action Creator 2{' '}
      </button>
      {userText ? <h3> {userText} </h3> : <h3> No User Text </h3>}
      <br />
      {stateProp1 ? <p> stateProp1 is true </p> : <p> stateProp1 is false </p>}
    </div>
  );
};

export default connector(Container1);
