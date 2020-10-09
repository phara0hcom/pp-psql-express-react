import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { RootState } from '../store/reducers';

const mapStateToProps = (state: RootState) => {
  return {
    profile: state.authReducer.profile,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ProfileProps = PropsFromRedux;

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div>
      <h1>{profile?.nickname}</h1>
      <br />
      <img src={profile?.picture} alt="" />
      <br />
      <h4> {profile?.email}</h4>
      <br />
      <h5> {profile?.name} </h5>
      <br />
      <h6> Email Verified: </h6>
      {profile?.email_verified ? <p>Yes</p> : <p>No</p>}
      <br />
    </div>
  );
};

export default connector(Profile);
