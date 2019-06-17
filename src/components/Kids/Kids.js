import React, { Component } from 'react';
import Page from '../page/Page';

export default class Kids extends Component {
    render() {
        return (
            <div>
                <Page title="Kids" pathname={this.props.history.location.pathname}/>
            </div>
        )
    }
}
