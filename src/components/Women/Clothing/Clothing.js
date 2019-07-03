import React, { Component } from 'react';
import Page from '../../page/Page';

export default class Clothing extends Component {
    render() {
        return (
            <div>
                <Page title="clothing"  pathname={this.props.match.path}/>
            </div>
        )
    }
}
