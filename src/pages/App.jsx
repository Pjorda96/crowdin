import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';

import routes from "../routes/routes";
import Spinner from "../common/Spinner";

// Components
const Navbar = React.lazy(() => import('../components/Navbar'));

// Routes
const Default = React.lazy(() => import('./Default'));

export default function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<Spinner />}>
          <Navbar />
        </Suspense>

        <Switch>
          <Route path={routes.home.path}>
            <Suspense fallback={<Spinner />}>
              <Default />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
