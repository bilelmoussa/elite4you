import React, { Component } from 'react'
import Page from '../page/Page';

export default class Women extends Component {
    render() {
        return (
            <div>
                <Page title="Women" pathname={this.props.history.location.pathname}/>
            </div>
        )
    }
}
