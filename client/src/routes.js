import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container1 from './containers/container1';
import Header from './containers/header';
import Profile from './containers/profile';
import Form1 from './containers/form1';
import RenderList from './containers/renderList.tsx';

import Component1 from './functional/component1';
import Callback from './functional/callback';
import PrivateComponent from './functional/privateComponent';
import UnAuthRedirect from './functional/unAuthRedirect';
import Home from './functional/home';
import RenderListItem from './functional/renderListItem.tsx';

import * as ACTIONS from './store/authReducer/actions';

import Auth from './utils/auth';
import AuthCheck from './utils/authCheck';
import history from './utils/history';

import { Router, Route, Switch, Redirect } from 'react-router';

export const auth = new Auth();

const handleAuthentication = (props) => {
  if (props.location.hash) {
    auth.handleAuth();
  }
};

const PrivateRoute = ({ component: Component, auth }) => (
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

class Routes extends Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.login_success();
      auth.getProfile();
      setTimeout(() => {
        this.props.addProfile(auth.userProfile);
      }, 400);
    } else {
      this.props.login_failure();
      this.props.remove_profile();
    }
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header auth={auth} />
            <Switch>
              <Route exact name="home" path="/" component={Home} />
              <Route exact name="form1" path="/form1" component={Form1} />
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
              <Route
                name="RenderList"
                path="/renderList"
                component={RenderList}
              />

              <Route
                name="callback"
                path="/callback"
                render={(props) => {
                  handleAuthentication(props);
                  return <Callback />;
                }}
              />
              <Route
                name="component1"
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
              <PrivateRoute path="/profile" auth={auth} component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    addProfile: (profile) => dispatch(ACTIONS.addProfile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile())
  };
}

export default connect(null, mapDispatchToProps)(Routes);
