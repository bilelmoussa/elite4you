import React, { Component } from 'react';
import Page from '../page/Page';

export default class NewProducts extends Component {
    render() {
        return (
            <div>
                <Page title="New Products" pathname={this.props.history.location.pathname}/>
            </div>
        )
    }
}
