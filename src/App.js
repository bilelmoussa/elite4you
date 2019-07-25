import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import Client from './components/Client/Client';
import Admin from './components/Admin/Admin'
import PageNotFound from './components/PageNotFound/PageNotFound'
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './action/authentication';

import Loading from './StyleComponents/Loading/Loading';
import jwt_decode from 'jwt-decode';

function decodeToken(token) {
  let decoded = {};
  try {
    decoded = jwt_decode(token);
  } catch (err) {
    console.log(err)
    store.dispatch(logoutUser());
  }
  return decoded;
};

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = decodeToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {

  render(){
    console.log(process.env.PUBLIC_URL);
    return (
      <Provider store = { store }>
      <div className="App">
          <Router  basename={process.env.PUBLIC_URL + '/'} >
                  <div id="content">
                    <Switch>
                        <Route exact path='/' render={()=>(<Redirect to="/home"/>)}/>
                        <Route path='/home'  component={Client} />
                        <Route path='/Admin' component={Admin} />
                        <Route component={PageNotFound}/>
                    </Switch>
                  </div>
          </Router>
      </div>
      <Loading />
      </Provider>
    );
  }
}

export default App;

