import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
