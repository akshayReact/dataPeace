import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Details from './Details'

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={Details} />
    </Router>
  );
}

export default AppRouter;
