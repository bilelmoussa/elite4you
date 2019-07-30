import React, { Component } from 'react';
import Page from '../../page/Page';

export default class Clothing extends Component {
    render() {
        return (
            <div>
                <Page categorie={this.props.categorie} childCategorie={this.props.childCategorie}  pathname={this.props.pathname}/>
            </div>
        )
    }
}
