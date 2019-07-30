import React, { Component } from 'react';
import Page from '../../page/Page';

export default class Accessories extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Page categorie={this.props.categorie} childCategorie={this.props.childCategorie}  pathname={this.props.pathname}/>
            </div>
        )
    }
}
