import React, { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import history from './history';
import * as ACTIONS from '../store/authReducer/actions';
import { RootState } from '../store/';
import { Profile } from '../store/authReducer/reducer';
import Axios from 'axios';

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = {
  login_success: () => ACTIONS.login_success(),
  login_failure: () => ACTIONS.login_failure(),
  addProfile: (profile: Profile) => ACTIONS.addProfile(profile),
  remove_profile: () => ACTIONS.remove_profile(),
  set_db_profile: (profile: Profile) => ACTIONS.setDbProfile(profile),
  remove_db_profile: () => ACTIONS.removeDbProfile()
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ParentProps = {
  auth: any;
};

type AuthCheckProps = PropsFromRedux & ParentProps;

const AuthCheck: React.FC<AuthCheckProps> = ({
  auth,
  set_db_profile,
  login_success,
  addProfile,
  login_failure,
  remove_profile
}) => {
  const send_profile_to_db = (profile: { profile: Profile }) => {
    return Axios.post('/api/posts/userProfileToDB', profile)
      .then(() =>
        Axios.get('/api/get/userProfileFromDb', {
          params: { email: profile.profile.email }
        })
      )
      .then((res) => {
        console.log('userProfileFromDb', { res });
        return set_db_profile(res.data);
      });
  };

  useEffect(() => {
    if (auth.isAuthenticated()) {
      login_success();
      addProfile(auth.userProfile);
      send_profile_to_db(auth.userProfile).then(() => history.replace('/'));
    } else {
      login_failure();
      remove_profile();
      history.replace('/');
    }
  });

  return null;
};

export default connector(AuthCheck);
