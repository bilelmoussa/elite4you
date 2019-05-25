import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import ButtonBase from '@material-ui/core/ButtonBase';




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
        backgroundColor: "#ec6d6d47",
        padding: 10,
        borderRadius: 5,
        color: "#222"
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
    }
})


class home extends Component {
    constructor(){
        super();
        this.state = {
            display: true,
            width: 600
        }
    }
    render() {
        const { classes } = this.props;
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                }
            ]
          };

        return (
                <div id="home">
                    <div id="show_case">
                            <div id="bg_1" className={classes.bg_showcase}>
                                <Button component={Link} to={`/Womens`} className={classes.button_Base}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Womens</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                                </Button>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Womens</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Womens`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            <div id="bg_2" className={classes.bg_showcase}>
                                <Button component={Link} to={`/kids`}  className={classes.button_Base}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Kids</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button  variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                                </Button>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Kids</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Kids`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            <div id="bg_3" className={classes.bg_showcase}>
                                <Button component={Link} to={`/Sale`} className={classes.button_Base}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Find More</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                                </Button>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Find More</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Sale`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            
                    </div>

                    <div id="container_slider">
                    <div className="container_slick">
                        <h2>Discount Products</h2>
                        <Slider {...settings}>
                            <div className="silde">
                               <div className="inside_slide">
                                    <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery" id="GB_1"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title"> Knotted T-Shirt Midi Dress</p>
                                                    <p className="Slide_Price"><b className="old_price">$29.00</b>$24.00</p>
                                                </div>
                                        </div>
                                    </ButtonBase>
                               </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                    <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery" id="GB_2"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title">Zoey Button Up Tie-Front Maxi Dress
                                                    </p>
                                                    <p className="Slide_Price"><b className="old_price">$45.00</b>$39.00</p>
                                                </div>
                                        </div>
                                    </ButtonBase>
                                </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                    <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery" id="GB_3"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title">Harlee Printed Button Front Midi Dress
                                                    </p>
                                                    <p className="Slide_Price"><b className="old_price">$45.00</b>$39.00</p>
                                                </div>
                                        </div>
                                    </ButtonBase>
                                </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title"></p>
                                                    <p className="Slide_Price"></p>
                                                </div>
                                        </div>
                                </ButtonBase>
                                </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title"></p>
                                                    <p className="Slide_Price"></p>
                                                </div>
                                        </div>
                                </ButtonBase>
                                </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title"></p>
                                                    <p className="Slide_Price"></p>
                                                </div>
                                        </div>
                                </ButtonBase>
                                </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title"></p>
                                                    <p className="Slide_Price"></p>
                                                </div>
                                        </div>
                                </ButtonBase>
                                </div>
                            </div>
                            <div  className="silde">
                                <div className="inside_slide">
                                <ButtonBase className={classes.button_Base}>
                                        <div className="inside_button_slide">
                                                <div className="Img_Gallery"/>
                                                <div className="under_Img_Gallery">
                                                    <p className="slide_title"></p>
                                                    <p className="Slide_Price"></p>
                                                </div>
                                        </div>
                                </ButtonBase>
                                </div>
                            </div>
                        </Slider>
                        </div>  
                    </div>
                   
                </div>            
        )
    }
}

home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles )(home);
