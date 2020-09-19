import Navbar from "./components/Navbar";
import UserContext from "./utils/UserContext";
import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import Summary from './components/Summary/Summary'
import Positions from './components/Positions/Positions'
import Trade from './components/Trade/Trade'
import Realtime from './components/Realtime/Realtime'
import History from './components/History/History'
import "./App.css"

import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  

function App() {

    const [title, updateTitle] = useState(null);
    const [user,setUser]=useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
      <Router>
      <div className="App">
      <UserContext.Provider value={{user}}>
        <Header title={title} user={user} setUser={setUser}/>
        <Navbar />
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <LoginForm setUser={setUser} showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <PrivateRoute path="/home">
                <Home/>
              </PrivateRoute>
              <PrivateRoute path="/summary">
                <Summary/>
              </PrivateRoute>
              <PrivateRoute path="/positions">
                <Positions/>
              </PrivateRoute>
              <PrivateRoute path="/trade">
                <Trade/>
              </PrivateRoute>
              <PrivateRoute path="/realtime">
                <Realtime/>
              </PrivateRoute>   
              <PrivateRoute path="/history">
                <History/>
              </PrivateRoute>           
            </Switch>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
          </div>
          </UserContext.Provider>
      </div>
      </Router>
    );

}

export default App;
