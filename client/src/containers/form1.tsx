import React, { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import * as ACTIONS from '../store/actions/actions';
import { RootState } from '../store/reducers';

const mapStateToProps = (state: RootState) => {
  return {
    userText: state.userReducer.userText
  };
};

const mapDispatchToProps = {
  inputActionCreator: (text: string) => ACTIONS.user_input(text)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Form1Props = PropsFromRedux;

const Form1: React.FC<Form1Props> = ({ userText, inputActionCreator }) => {
  const [inputVal, setInputVal] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputVal(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputActionCreator(inputVal);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Input </label>
        <input id="name" onChange={handleChange} type="text" />
        <button type="submit"> Submit </button>
      </form>
      <br />
      <h3>React State:</h3>
      <p>{inputVal}</p>
      <br />
      <h3>Redux State:</h3>
      <p>{userText}</p>
    </div>
  );
};

export default connector(Form1);
