import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";
import PublicNavbar from "./components/PublicNavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Favourite from "./pages/Favourite";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faStar, faStopwatch);

function App() {
  return (
    <Router>
      <div className="background">
        <PublicNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/">
            <HomePage />
          </Route> */}
          <Route exact path="/movies/:id" component={MovieDetailPage} />
          <Route exact path="/favourite" component={Favourite} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
