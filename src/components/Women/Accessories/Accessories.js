import React, { Component } from 'react';
import Page from '../../page/Page';

export default class Accessories extends Component {
    render() {
        return (
            <div>
                <Page title="accessories"  pathname={this.props.match.path}/>
            </div>
        )
    }
}
