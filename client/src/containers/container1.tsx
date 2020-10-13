import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as ACTIONS from '../store/reducer/actions';
import { RootState } from '../store/';
import Auth from '../utils/auth';

const mapStateToProps = (state: RootState) => {
  return {
    stateProp1: state.reducer.stateProp1,
    userText: state.userReducer.userText
  };
};

const mapDispatchToProps = {
  action1: () => ACTIONS.SUCCESS,
  action2: () => ACTIONS.FAILURE,
  actionCreator1: () => ACTIONS.success(),
  actionCreator2: () => ACTIONS.failure()
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface PropsFromParent {
  auth: Auth;
}

type Container1Props = PropsFromRedux & PropsFromParent;

const Container1: React.FC<Container1Props> = ({
  stateProp1,
  userText,
  action1,
  action2,
  actionCreator1,
  actionCreator2
}) => {
  return (
    <div>
      <button onClick={() => console.log(stateProp1)}> Get State </button>
      <button onClick={action1}>Dispatch Action 1 </button>
      <button onClick={action2}>Dispatch Action 2 </button>
      <button onClick={actionCreator1}>Dispatch Action Creator 1 </button>
      <button onClick={actionCreator2}>Dispatch Action Creator 2 </button>
      {userText ? <h3> {userText} </h3> : <h3> No User Text </h3>}
      <br />
      {stateProp1 ? <p> stateProp1 is true </p> : <p> stateProp1 is false </p>}
    </div>
  );
};

export default connector(Container1);
