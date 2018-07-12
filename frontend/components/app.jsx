import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import UserProfileContainer from './user/user_profile_container';
import NavBarContainer from './navbar/navbar_container';
import FontAwesome from 'react-fontawesome';
import EditProfileForm from './user/edit_profile_form';

const App = () => {
  return (
    <div>
      <section>
        <ProtectedRoute path="/" component={NavBarContainer}/>
        <section className="session-order">
          <Switch>
            <AuthRoute exact path="/" component={SignupFormContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
          </Switch>

        </section>
        <Switch>
          <Route exact path="/users/:userId"
          component={UserProfileContainer}/>
          <Route exact path="/users/:userId/edit"
          component={EditProfileForm}/>
        </Switch>
      </section>
    </div>
  );
};

export default App;
