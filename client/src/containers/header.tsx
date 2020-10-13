import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
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
        <button onClick={loginWithRedirect}>Login</button>
      ) : (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
