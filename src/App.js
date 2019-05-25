import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Client from './components/Client/Client';

const pagenotfound = ({ location }) => (
  <div>
    <h3> wf No match for <code>{location.pathname}</code></h3>
  </div>
)



class App extends Component {

  render(){

    return (
      <div className="App">
          <Router  basename={ process.env.PUBLIC_URL }>
                  <div id="content">
                    <Switch>
                        <Route path='/'  component={Client} />
                        <Route component={pagenotfound}/>
                    </Switch>
                  </div>
          </Router>
      </div>
    );
  }
}

export default App;

