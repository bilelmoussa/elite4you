import React, { Component } from 'react';
import { HashRouter  as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import Client from './components/Client/Client';
import Admin from './components/Admin/Admin'
import PageNotFound from './components/PageNotFound/PageNotFound'
import setAuthToken from './setAuthToken';
import { setCurrentUser } from './action/authentication';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = localStorage.jwtToken;
  store.dispatch(setCurrentUser(decoded));
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
                        <Route exact path='/' render={()=>(<Redirect to="/client"/>)}/>
                        <Route path='/client'  component={Client} />
                        <Route path='/Admin' component={Admin} />
                        <Route component={PageNotFound}/>
                    </Switch>
                  </div>
          </Router>
      </div>
      </Provider>
    );
  }
}

export default App;

