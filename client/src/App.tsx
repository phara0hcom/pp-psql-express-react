import React, { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import Container1 from './containers/container1';
import Header from './containers/header';
import ProfileComp from './containers/profile';
import RenderList from './containers/renderList';

import Component1 from './functional/component1';
import Callback from './functional/callback';
import PrivateComponent from './functional/privateComponent';
import Home from './functional/home';
import RenderListItem from './functional/renderListItem';

import * as ACTIONS from './store/authReducer/actions';

import history from './utils/history';

import {
  Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  StaticContext
} from 'react-router';
import AddPost from './components/AddPost';
import { Profile } from './store/authReducer/reducer';
import { RootState } from './store';

const PrivateRoute: React.FC<{
  path: string;
  component: React.FC<RouteComponentProps<any, StaticContext, unknown>>;
  isAuthenticated: boolean;
}> = ({ path, component, isAuthenticated }) => {
  return isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    storeIsAuthenticated: state.authReducer.isAuthenticated
  };
};

const mapDispatchToProps = {
  login_success: () => ACTIONS.login_success(),
  login_failure: () => ACTIONS.login_failure(),
  addProfile: (profile: Profile) => ACTIONS.addProfile(profile),
  remove_profile: () => ACTIONS.remove_profile()
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux;

const App: React.FC<AppProps> = ({
  storeIsAuthenticated,
  login_success,
  login_failure,
  addProfile,
  remove_profile
}) => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && !storeIsAuthenticated) {
      console.log(user, isAuthenticated);
      login_success();
      addProfile(user);
    } else if (!isAuthenticated) {
      login_failure();
      remove_profile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, storeIsAuthenticated]);

  return (
    <Router history={history}>
      <Header />
      <div className="AppMain">
        <Switch>
          <Route exact name="home" path="/" component={Home} />
          <Route exact name="form1" path="/form1" component={AddPost} />
          <Route exact name="auth" path="/container1" component={Container1} />
          <Route name="RenderList" path="/renderList" component={RenderList} />

          <Route path="/callback" component={Callback} />
          <Route path="/component1" component={Component1} />

          <Route
            name="component1"
            path="/listItem/:id"
            component={RenderListItem}
          />

          <PrivateRoute
            path="/privateRoute"
            isAuthenticated={isAuthenticated}
            component={PrivateComponent}
          />
          <PrivateRoute
            path="/profile"
            isAuthenticated={isAuthenticated}
            component={ProfileComp}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default connector(App);
