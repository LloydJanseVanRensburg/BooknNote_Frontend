import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Navbar from "./components/Layout/Navbar/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthContext from "./context/auth/authContext";
import UIState from "./context/uiContext/UIState";
import Alerts from "./components/Layout/Alerts/Alerts";

//Pages
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Home from "./components/Pages/Home/Home";
import AllNotes from "./components/Pages/AllNotes/AllNotes";
import AllBooks from "./components/Pages/AllBooks/AllBooks";
import Profile from "./components/Pages/Profile/Profile";
import SinglePost from "./components/Pages/SinglePost/SinglePost";
import SearchResults from "./components/Pages/SearchResults/SearchResults";
import AdvertiseNow from "./components/Pages/AdvertiseNow/AdvertiseNow";
import MaintainAdvert from "./components/Pages/AdvertiseNow/MaintainAdvert/MaintainAdvert";

function App() {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  return (
    <UIState>
      <Router>
        {/* NavBar */}
        <Navbar />
        <div className="app">
          {/* Pages */}
          <Alerts />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/allnotes" component={AllNotes} />
            <Route exact path="/allbooks" component={AllBooks} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/searchresults" component={SearchResults} />
            <PrivateRoute exact path="/singlepost/:id" component={SinglePost} />
            <PrivateRoute
              exact
              path="/advertisehere"
              component={AdvertiseNow}
            />
            <PrivateRoute exact path="/advert/book">
              <MaintainAdvert type="book" />
            </PrivateRoute>
            <PrivateRoute exact path="/advert/note">
              <MaintainAdvert type="note" />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </UIState>
  );
}

export default App;
