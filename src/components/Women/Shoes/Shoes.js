import React, { Component } from 'react';
import Page from '../../page/Page';

export default class Shoes extends Component {
    render() {
        return (
            <div>
                <Page title="shoes"  pathname={this.props.match.path}/>
            </div>
        )
    }
}
