import React, { Component } from 'react'
import Page from '../page/Page'
export default class Trend extends Component {
    render() {
        return (
            <div>
                <Page title="Trend" pathname={this.props.history.location.pathname}/>
            </div>
        )
    }
}
