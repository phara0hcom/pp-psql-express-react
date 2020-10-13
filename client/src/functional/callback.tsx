import { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import history from '../utils/history';
import * as ACTIONS from '../store/authReducer/actions';
import { RootState } from '../store/';
import { Profile } from '../store/authReducer/reducer';
import Axios from 'axios';
import { profileEnd } from 'console';

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

type AuthCheckProps = PropsFromRedux;

const Callback: React.FC<AuthCheckProps> = ({
  set_db_profile,
  login_success,
  addProfile,
  login_failure,
  remove_profile
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const send_profile_to_db = (profile: Profile) => {
    console.log({ profile });
    return Axios.post('/api/user/create', {
      ...profile,
      username: profile.nickname
    })
      .then((res) => {
        console.log('userProfileToDB', { res });
        return Axios.get('/api/user/get', {
          params: { email: profile.email }
        });
      })
      .then((res) => {
        console.log('userProfileFromDb', { res });
        return set_db_profile(res.data);
      });
  };

  useEffect(() => {
    console.log({ isAuthenticated, isLoading, user });
    if (isAuthenticated && !isLoading) {
      login_success();
      addProfile(user);
      send_profile_to_db(user).then(() => history.replace('/'));
    } else if (!isLoading) {
      login_failure();
      remove_profile();
      history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, user]);

  return null;
};

export default connector(Callback);
