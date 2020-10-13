import React, { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import Container1 from './containers/container1';
import Header from './containers/header';
import ProfileComp from './containers/profile';
import RenderList from './containers/renderList';

import Component1 from './functional/component1';
import Callback from './functional/callback';
import PrivateComponent from './functional/privateComponent';
import UnAuthRedirect from './functional/unAuthRedirect';
import Home from './functional/home';
import RenderListItem from './functional/renderListItem';

import * as ACTIONS from './store/authReducer/actions';

import Auth from './utils/auth';
import AuthCheck from './utils/authCheck';
import history from './utils/history';

import { Router, Route, Switch, Redirect } from 'react-router';
import AddPost from './components/AddPost';
import { Profile } from './store/authReducer/reducer';

export const auth = new Auth();

const PrivateRoute: React.FC<{
  path: string;
  component: React.FC<{ auth: Auth }>;
  auth: Auth;
}> = ({ component: Component, auth }) => (
  <Route
    render={(props) =>
      auth.isAuthenticated() === true ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: '/redirect' }} />
      )
    }
  />
);

const mapDispatchToProps = {
  login_success: () => ACTIONS.login_success(),
  login_failure: () => ACTIONS.login_failure(),
  addProfile: (profile: Profile | {}) => ACTIONS.addProfile(profile),
  remove_profile: () => ACTIONS.remove_profile()
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux;

const App: React.FC<AppProps> = ({
  login_success,
  login_failure,
  addProfile,
  remove_profile
}) => {
  useEffect(() => {
    if (auth.isAuthenticated()) {
      login_success();
      auth.getProfile();
      setTimeout(() => {
        addProfile(auth.userProfile);
      }, 400);
    } else {
      login_failure();
      remove_profile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Router history={history}>
      <Header auth={auth} />
      <div>
        <Switch>
          <Route exact name="home" path="/" component={Home} />
          <Route exact name="form1" path="/form1" component={AddPost} />
          <Route
            exact
            name="auth"
            path="/container1"
            render={() => <Container1 auth={auth} />}
          />
          <Route
            name="authCheck"
            path="/authCheck"
            render={() => <AuthCheck auth={auth} />}
          />
          <Route
            name="UnAuthRedirect"
            path="/redirect"
            component={UnAuthRedirect}
          />
          <Route name="RenderList" path="/renderList" component={RenderList} />

          <Route
            path="/callback"
            render={(props) => {
              if (props.location.hash) {
                auth.handleAuth();
              }
              return <Callback />;
            }}
          />
          <Route
            path="/component1"
            render={(props) => <Component1 {...props} />}
          />

          <Route
            name="component1"
            path="/listItem/:id"
            component={RenderListItem}
          />

          <PrivateRoute
            path="/privateRoute"
            auth={auth}
            component={PrivateComponent}
          />
          <PrivateRoute path="/profile" auth={auth} component={ProfileComp} />
        </Switch>
      </div>
    </Router>
  );
};

export default connector(App);
