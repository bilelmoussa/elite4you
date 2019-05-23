import React, { Component } from 'react';
import { BrowserRouter  as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import home from './components/home/home';

const pagenotfound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)



class App extends Component {

  render(){

    return (
      <div className="App">
          <Router  basename={ process.env.PUBLIC_URL }>
                  <div id="content">
                    <Switch>
                        <Route path='/' exact component={home} />
                        <Route component={pagenotfound}/>
                    </Switch>
                  </div>
          </Router>
      </div>
    );
  }
}

export default App;

