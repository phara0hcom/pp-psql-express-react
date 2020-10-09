import React, { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';

// import history from './history';
import * as ACTIONS from '../store/authReducer/actions';
import { RootState } from '../store/';
import { Profile } from '../store/authReducer/reducer';

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = {
  login_success: () => ACTIONS.login_success(),
  login_failure: () => ACTIONS.login_failure(),
  addProfile: (profile: Profile) => ACTIONS.addProfile(profile),
  remove_profile: () => ACTIONS.remove_profile()
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AuthCheckProps = PropsFromRedux;

const AuthCheck: React.FC<AuthCheckProps> = () => {
  useEffect(() => {
    // if (this.props.auth.isAuthenticated()) {
    //   this.props.login_success();
    //   this.props.addProfile(this.props.auth.userProfile);
    //   history.replace('/');
    // } else {
    //   this.props.login_failure();
    //   this.props.remove_profile();
    //   history.replace('/');
    // }
  });

  return null;
};

export default connector(AuthCheck);
