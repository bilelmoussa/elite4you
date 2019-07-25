import React, { Component } from 'react';
import Page from '../page/Page';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {GetProducts} from '../../action/authentication';

import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

class Kids extends Component {

    componentDidMount(){
        this.props.GetProducts({ProductCategories: "kids"})
    }

    render() {
        const{match} = this.props;

        console.log(this.props);
        return (
            <div>
               
                <Switch>
                    <Route exact path={`${match.path}`} render={()=>(
                         <Page title="Kids" pathname={this.props.history.location.pathname}/>
                        )}
                        />
                   
                    <Route  component={PageNotFound}/>
                </Switch>
            </div>
        )
    }
}


Kids.protoType = {
    GetProducts: PropTypes.func.isRequired,
    ProductsInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    ProductsInfo: state.ProductsInfo
})

export default connect(mapStateToProps, {GetProducts})(Kids)
