import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Navbar from "./components/Layout/Navbar/Navbar";

//Pages
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Home from "./components/Pages/Home/Home";
import Profile from "./components/Pages/Profile/Profile";
import SinglePost from "./components/Pages/SinglePost/SinglePost";

function App() {
  return (
    <Router>
      {/* NavBar */}
      <Navbar />
      <div className="app">
        {/* Pages */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/singlepost" component={SinglePost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
