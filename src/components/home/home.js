import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SlickComponent from '../../StyleComponents/SlickComponent/SlickComponent'



const styles = theme => ({
    bg_showcase:{
        position: "relative",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#f5f5f5",
        height: 500,
        width: "100%",
        paddingTop: "45%",
        overflow: "hidden",
        [theme.breakpoints.down('md')]: {
            height: "400px",
        },
        [theme.breakpoints.down('sm')]: {
            height: "300px",
        },
        [theme.breakpoints.down('xs')]: {
            height: "200px !important",
        },
    },
    left_side_text:{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        width: "60%",
        margin: "30px auto 0 30px",
        [theme.breakpoints.down('sm')]: {
            width: "70%",
        },
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
    under_side_text:{
        position: "relative",
        flexDirection: "column",
        width: "90%",
        margin: "0 auto",
        padding: "15px 5px",
        display: "none",
        [theme.breakpoints.down('xs')]: {
            display: "flex",
        },
    },
    button:{
        margin: "10px 0",
        width: 150,
        color: "#fff",
        backgroundColor: "#ff7070",
        '&:hover': {
              backgroundColor: "#d86060",
        },
        [theme.breakpoints.down('xs')]: {
            margin: "10px auto",
        },  
    },
    p_:{
        fontFamily: "'Roboto', sans-serif;",
        fontSize: 20,
        letterSpacing: 1,
        textTransform: "capitalize",
        lineHeight: "2em",
        backgroundColor: "#ffffff75",
        padding: 10,
        borderRadius: 5,
        color: "#222"
    },
    B_inside_p:{
        fontSize: 22,
        textTransform: "uppercase"
    },
    under_p_:{
        fontFamily: "'Roboto', sans-serif;",
        fontSize: 14,
        letterSpacing: 1,
        textTransform: "capitalize",
        lineHeight: "2em",
        padding: 10,
        borderRadius: 5,
        color: "#222",
        textAlign: "center"
    },

    under_B_inside_p:{
        fontSize: 18,
        textTransform: "uppercase"
    },

    button_Base :{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        color: theme.palette.common.white,
    },

})


class home extends Component {
    constructor(){
        super();
        this.state = {
            display: true,
            width: 600,
            Sold_data : [
                {
                    ProductImage: "Gallery_1.webp",
                    ProductName: "Knotted T-Shirt Midi Dress",
                    ProductPrice: 20.00,
                    ProductOldPrice: 35.00,
                    Discount: 10,
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
                }
            ],
            NewProducts_data: [
                {
                    ProductImage: "Gallery_4.webp",
                    ProductName: "Evie Ruffle Dress",
                    ProductPrice: 36.00,
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
                    ProductImage: "Gallery_5.webp",
                    ProductName: "Delilah Button Front Mini Dress",
                    ProductPrice: 36.00,
                    newProduct: true
                },
            ]
        }
    }


    render() {
        const { classes } = this.props;
        const { Sold_data, NewProducts_data } = this.state;

        return (
                <div id="home">
                    <div id="show_case">
                            <div id="bg_1" className={classes.bg_showcase}>
                                <Button component={Link} to={`/home/Womens`} className={classes.button_Base}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Womens</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                                </Button>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Womens</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/home/Womens`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            <div id="bg_2" className={classes.bg_showcase}>
                                <Button component={Link} to={`/home/kids`}  className={classes.button_Base}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Kids</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button  variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                                </Button>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Kids</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/home/Kids`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            <div id="bg_3" className={classes.bg_showcase}>
                                <Button component={Link} to={`/home/Sale`} className={classes.button_Base}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Find More</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                                </Button>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Find More</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/home/Sale`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            
                    </div>

                   <SlickComponent data={Sold_data} title="Discount Products"/>
                   <SlickComponent data={NewProducts_data} title="New Products"/>

                </div>            
        )
    }
}

home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(home);


