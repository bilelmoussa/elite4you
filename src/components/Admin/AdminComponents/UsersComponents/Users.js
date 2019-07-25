import React, { Component } from 'react';
import {empty} from '../../../../is-empty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Users extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount() {
        let user_role = this.props.user.user.role || "";

        if(empty(user_role) || user_role !== "admin"){
            this.props.history.push('/Admin/login');
        }
    }

    render() {
        return (
            <div>
                Users
            </div>
        )
    }
}

Users.protoType = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default  connect(mapStateToProps)(Users)
