import React, { Component } from 'react'
import Page from '../page/Page';

export default class Womens extends Component {
    render() {
        return (
            <div>
                <Page title="Womens" pathname={this.props.history.location.pathname}/>
            </div>
        )
    }
}
