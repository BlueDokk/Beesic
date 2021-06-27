import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import spotifyService from './services/spotifyService';
import NavBar from './components/common/navBar';
import Footer from './components/common/footer';
import Home from './components/home';
import NotFound from './components/notFound';
import AboutUs from './components/aboutUs';
import Login from './components/login';
import SignUp from './components/signUp';
import MyLists from './components/myLists';
import Artist from './components/artist';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  
  // Get current path for restrict links in navbar
  const currentPath = useLocation().pathname;
  
  // Set initial user value.
  const [user, setUser] = useState({});
  
  useEffect(() => {
    
    // Get token to connect with the spotify api. 
    spotifyService.getToken().then(tokenResponse => {
      // Save token in localStorage
      localStorage.setItem('token', tokenResponse.data.access_token);
    })

    // Get user from local storage.
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(currentUser);
  }, [currentPath]);

  return (

    <div>
      <NavBar path={currentPath} user={user} />
      <ToastContainer className="error" />
      <main className="container-fluid">
        <Switch>
          <Route path="/not-found"
            component={NotFound}
          />
          <Route path="/home"
            render={(props) => {
              return <Home {...props} />
            }}
          />
          <Route path="/home:id"
            render={(props) => {
              return <Artist {...props} />
            }}
          />
          <Route path="/aboutus"
            component={AboutUs}
          />
          <Route path="/login"
            render={(props) => {
              if (Object.keys(user).length === 0) return <Login {...props} />;
              return <Redirect to="/home" />;
            }}
          />
          <Route path="/signup"
            render={(props) => {
              if (Object.keys(user).length === 0) return <SignUp {...props} />;
              return <Home />;
            }}
          />

          <Route path="/mylists"
            component={MyLists}
          />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;

