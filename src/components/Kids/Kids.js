import React, { Component } from 'react';
import Page from '../page/Page';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {GetProducts, GetSize, GetColor, ResetPageProducts} from '../../action/authentication';
import Clothing from '../childrenCatRoutes/Clothing/Clothing';
import Shoes from '../childrenCatRoutes/Shoes/Shoes';
import Accessories from '../childrenCatRoutes/Accessories/Accessories';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

class Kids extends Component {

    render() {
        const{match} = this.props;
        return (
            <div>
                <Switch>
                    <Route exact path={`${match.path}`} render={()=>(
                         <Page 
                            categorie="kids"
                            childCategorie="" 
                            pathname={this.props.history.location.pathname}
                            childrenLink={['clothing', 'shoes', 'accessories']}
                         />
                        )}
                    />
                    <Route exact path={`${match.path}/clothing`} render={()=>(
                        <Clothing 
                            categorie="kids"
                            childCategorie="clothing"
                            pathname={this.props.history.location.pathname} 
                        />
                    )}/>
                    <Route exact path={`${match.path}/shoes`} render={()=>(
                        <Shoes 
                            categorie="kids"
                            childCategorie="shoes"
                            pathname={this.props.history.location.pathname}
                        />
                    )}/>
                    <Route exact path={`${match.path}/accessories`} render={()=>(
                        <Accessories 
                            categorie="kids"
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


Kids.protoType = {
    GetProducts: PropTypes.func.isRequired,
    ProductsInfo: PropTypes.object.isRequired,
    GetSize: PropTypes.func.isRequired,
    GetColor: PropTypes.func.isRequired,
    ResetPageProducts: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
    ProductsInfo: state.ProductsInfo
})

export default connect(mapStateToProps, {GetProducts, GetSize, GetColor, ResetPageProducts})(Kids)
