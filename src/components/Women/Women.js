import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Page from '../page/Page';
import Clothing from '../childrenCatRoutes/Clothing/Clothing';
import Shoes from '../childrenCatRoutes/Shoes/Shoes';
import Accessories from '../childrenCatRoutes/Accessories/Accessories';
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import {GetProducts, GetSize, GetColor, ResetPageProducts} from '../../action/authentication';

class Women extends Component {

    render() {
        const{match} = this.props;
       
        return (
            <div>
                <Switch>
                    <Route exact path={`${match.path}`} render={()=>(
                        <Page 
                            categorie="women"
                            childCategorie="" 
                            pathname={this.props.history.location.pathname}
                            childrenLink={['clothing', 'shoes', 'accessories']}
                        />
                    )}/>
                    <Route exact path={`${match.path}/clothing`} render={()=>(
                        <Clothing 
                            categorie="women"
                            childCategorie="clothing"
                            pathname={this.props.history.location.pathname} 
                        />
                    )}/>
                    <Route exact path={`${match.path}/shoes`} render={()=>(
                        <Shoes 
                            categorie="women"
                            childCategorie="shoes"
                            pathname={this.props.history.location.pathname}
                        />
                    )}/>
                    <Route exact path={`${match.path}/accessories`} render={()=>(
                        <Accessories 
                            categorie="women"
                            childCategorie="accessories"
                            pathname={this.props.history.location.pathname} 
                        />
                    )}/>
                    <Route  component={PageNotFound}/>
                </Switch>
             
            </div>
        )
    }

    componentWillUnmount(){
        this.props.ResetPageProducts();
    }
    
}

Women.protoType = {
    GetProducts: PropTypes.func.isRequired,
    ProductsInfo: PropTypes.object.isRequired,
    GetSize: PropTypes.func.isRequired,
    GetColor: PropTypes.func.isRequired,
    ResetPageProducts: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
    ProductsInfo: state.ProductsInfo
})

export default connect(mapStateToProps, {GetProducts, GetSize, GetColor, ResetPageProducts})(Women)
