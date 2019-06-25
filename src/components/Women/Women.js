import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '../page/Page';
import Clothing from './Clothing/Clothing';
import Shoes from './Shoes/Shoes';
import Accessories from './Accessories/Accessories';
import PageNotFound from '../../components/PageNotFound/PageNotFound'

export default class Women extends Component {
    constructor(){
        super();
        this.state={
            Products:[
                {
                    ProductImage: "Gallery_1.webp",
                    ProductName: "Knotted T-Shirt Midi Dress",
                    ProductPrice: 20.00,
                    colors: ["White", "Black", "Pink"],
                    Size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    description: "Black Short T-Shirt Midi Dress"
                },
                {
                    ProductImage: "Gallery_2.jpg",
                    ProductName: "Zoey Button Up Tie-Front Maxi Dress",
                    ProductPrice: 20.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                }
            ],
            childrenLink: ['clothing', 'shoes', 'accessories'],
            size: ['XXXS','XXS','XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '37', '38', '39', '40', '41', '42'],
            colors:['White', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Blue', 'Green', 'Black'],
        }
    }
    render() {
        const{match} = this.props;
       
        return (
            <div>
                <Switch>
                    <Route exact path={`${match.path}`} render={()=>(
                        <Page title="Women" colors={this.state.colors} size={this.state.size} childrenLink={this.state.childrenLink} Products={this.state.Products} pathname={this.props.match.path}/>
                        )}
                        />
                    <Route exact path={`${match.path}/Clothing`} Component={Clothing}/>
                    <Route exact path={`${match.path}/Shoes`} Component={Shoes}/>
                    <Route exact path={`${match.path}/Accessories`} Component={Accessories}/>
                    <Route  component={PageNotFound}/>
                </Switch>
             
            </div>
        )
    }
}

