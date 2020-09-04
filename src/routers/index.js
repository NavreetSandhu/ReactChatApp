
/*********** Routes for applications **************/

import React from 'react';
import { Switch } from 'react-router-dom';
import { publicLayout, privateLayout,landingPageLayout, LPMLayout } from '../components/Layouts';

import AppRoute from './AppRoute';
import { Auth } from '../auth';
import { public_type, private_type } from '../utilities/constants';
import NotFound from '../components/NoFound';
import LoginPage from '../containers/login';
import SignUp from '../containers/signup/index';
import RoleSetup from '../containers/signup/role-setup';
import Chat from '../containers/dashboard/chat';

const Routers = store => {
  return (
    <Switch>
     
     
      <AppRoute
        exact
        path="/"
        component={LoginPage}
        requireAuth={Auth}
        layout={publicLayout}
        store={store}
        type={public_type}
      />
      
      
      <AppRoute
        exact
        path="/signup"
        component={SignUp}
        requireAuth={Auth}
        layout={publicLayout}
        store={store}
        type={public_type}
      />
      
     
      
      <AppRoute
        exact
        path="/role-setup"
        component={RoleSetup}
        requireAuth={Auth}
        layout={publicLayout}
        store={store}
        type={public_type}
          />
      
      
          <AppRoute
              exact
              path="/chat"
              component={Chat}
              requireAuth={Auth}
              layout={privateLayout}
              store={store}
              type={private_type}
          />
          
      <AppRoute
        exact
        path="*"
        component={NotFound}
        requireAuth={Auth}
        layout={publicLayout}
        store={store}
        type={public_type}
      />      
    </Switch>
  );
};

export default Routers;