import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import DashboardComponent from './AdminComponents/DashboardComponents/Dashboard';
import PageNotFound from '../PageNotFound/PageNotFound';


class Admin extends Component {
    constructor(){
        super();
        this.state = {
            IsLoggedIn: false,
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            return {IsLoggedIn: nextProps.user.IsLoggedIn}
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            this.setState({
                IsLoggedIn: this.props.user.IsLoggedIn
            })
        }else{
            return null;
        }
    }
    

    render() {

        return (
            <Switch>
                <Route  exact path='/Admin' render={()=>(
                        this.state.IsLoggedIn ? (
                            <Redirect exact to="/Admin/login"/>
                        ) : (
                            <Redirect exact to="/Admin/dashboard"/>
                        ) 
                    )}/>
                <Route exact path='/Admin/login' component={LogIn} />
                <Route path='/Admin/dashboard' component={DashboardComponent} />
                <Route component={PageNotFound}/>
            </Switch>
        )
    }
}

Admin.protoType = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Admin);
