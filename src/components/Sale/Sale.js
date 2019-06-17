import React, { Component } from 'react'
import Page from '../page/Page'
export default class Sale extends Component {
    render() {
        return (
            <div>
                <Page title="Sale" pathname={this.props.history.location.pathname}/>
            </div>
        )
    }
}
