import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/';

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Header: React.FC<PropsFromRedux> = ({ isAuthenticated }) => {
  return (
    <div>
      <Link to="/" style={{ padding: '5px' }}>
        Home
      </Link>
      <Link to="/profile" style={{ padding: '5px' }}>
        Profile
      </Link>
      <Link to="/component1" style={{ padding: '5px' }}>
        Component 1
      </Link>
      <Link to="/container1" style={{ padding: '5px' }}>
        Container 1
      </Link>
      <Link to="/form1" style={{ padding: '5px' }}>
        Form 1
      </Link>
      <Link to="/renderList" style={{ padding: '5px' }}>
        List
      </Link>
      <Link to="/privateRoute" style={{ padding: '5px' }}>
        Private Route
      </Link>
      {!isAuthenticated ? (
        <button
          onClick={() => {
            // auth.login()
          }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => {
            // auth.logout()
          }}
        >
          Logout
        </button>
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

export default connector(Header);
