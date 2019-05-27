import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
    button_Base:{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        color: theme.palette.common.white,
        '&:hover': {
            opacity: "0.85",
        },
    }
})


class SlickComponent extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    Discount(d){
        if(d.Discount !== 0 && d.Discount){
            return(
                <div className="DiscountTag">-{d.Discount}%</div>
            )
        }else{
            return null;
        }
    }

    NewProduct(d){
        if(d.newProduct){
            return(
                <div className="NewTag">New</div>
            )
        }else{
            return null;
        }
    }

    ProductInfo(d){
        if(d.ProductOldPrice !== 0 && d.ProductOldPrice){
            return(
                <div className="under_Img_Gallery">
                    <p className="slide_title">{d.ProductName}</p>
                    <p className="Slide_Price"><b className="old_price">${d.ProductOldPrice}</b>${d.ProductPrice}</p>
                </div>
            )
        }else{
            return(
                <div className="under_Img_Gallery">
                    <p className="slide_title">{d.ProductName}</p>
                    <p className="Slide_Price">${d.ProductPrice}</p>
                </div>
            )
        }   
    }

    Slide(data, classes, settings, class_name){
        if(data.length !== 0){
            return(
                <Slider {...settings}>
                    {data.map((d, i) => {
                        return(
                        <div className={class_name} key={i}>
                                <div className="inside_slide">
                                    <ButtonBase  classes={{root:classes.button_Base}}>
                                        <div className="inside_button_slide">
                                                {this.Discount(d)}
                                                {this.NewProduct(d)}
                                                <div className="Img_Gallery" style={{backgroundImage: `url(${require(`../../static/${d.ProductImage}`)})`}}/>
                                                {this.ProductInfo(d)}
                                        </div>
                                    </ButtonBase>
                                </div>
                        </div>
                        )
                    })}
                </Slider>
             )
        }else{
            return (
                <div></div>
            );
        }
      
    }
  
        


    render() {
        const { classes, data, title } = this.props;

        let class_name = "slide";

        let ResponsiveSlideToShow = 0;
        let ResponsiveSlideToShow_1 = 0;
        let ResponsiveSlideToShow_2 = 0;
        let ResponsiveSlideToShow_3 = 0;

        let SlideToScroll = 0;
        let SlideToScroll_1 = 0;
        let SlideToScroll_2 = 0;
        let SlideToScroll_3 = 0;

        if(data.length === 4){
            class_name = "slide";
            ResponsiveSlideToShow = 4;
            ResponsiveSlideToShow_1 = 3;
            ResponsiveSlideToShow_2 = 2;
            ResponsiveSlideToShow_3 = 1;
            SlideToScroll = 4;
            SlideToScroll_1 = 3;
            SlideToScroll_2 = 2;
            SlideToScroll_3 = 1;
        }else if(data.length === 3){
            ResponsiveSlideToShow = 3;
            ResponsiveSlideToShow_1 = 3;
            ResponsiveSlideToShow_2 = 2;
            ResponsiveSlideToShow_3 = 1;
            SlideToScroll = 3;
            SlideToScroll_1 = 3;
            SlideToScroll_2 = 2;
            SlideToScroll_3 = 1;
        }else if(data.length === 2){
            class_name = "slide_2"
            ResponsiveSlideToShow = 2;
            ResponsiveSlideToShow_1 = 2;
            ResponsiveSlideToShow_2 = 1;
            ResponsiveSlideToShow_3 = 1;
            SlideToScroll = 2;
            SlideToScroll_1 = 2;
            SlideToScroll_2 = 1;
            SlideToScroll_3 = 1;
        }else if(data.length === 1){
            class_name = "slide_2"
            ResponsiveSlideToShow = 1;
            ResponsiveSlideToShow_1 = 1;
            ResponsiveSlideToShow_2 = 1;
            ResponsiveSlideToShow_3 = 1;
            SlideToScroll = 1;
            SlideToScroll_1 = 1;
            SlideToScroll_2 = 1;
            SlideToScroll_3 = 1;
        }else if(data.length === 0){
            ResponsiveSlideToShow = 0;
            ResponsiveSlideToShow_1 = 0;
            ResponsiveSlideToShow_2 = 0;
            ResponsiveSlideToShow_3 = 0;
            SlideToScroll = 0;
            SlideToScroll_1 = 0;
            SlideToScroll_2 = 0;
            SlideToScroll_3 = 0;
        }
        else{
            class_name = "slide";
            ResponsiveSlideToShow = 4;
            ResponsiveSlideToShow_1 = 3;
            ResponsiveSlideToShow_2 = 2;
            ResponsiveSlideToShow_3 = 1;
            SlideToScroll = 4;
            SlideToScroll_1 = 3;
            SlideToScroll_2 = 2;
            SlideToScroll_3 = 1;
        }


        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: ResponsiveSlideToShow,
            slidesToScroll: SlideToScroll,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: ResponsiveSlideToShow_1,
                      slidesToScroll: SlideToScroll_1,
                      infinite: true,
                      dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: ResponsiveSlideToShow_2,
                      slidesToScroll: SlideToScroll_2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: ResponsiveSlideToShow_3,
                      slidesToScroll: SlideToScroll_3
                    }
                }
            ]
          };

        

        return (
            <div className="container_slider">
                <div className="container_slick">
                        <div className="slick_title">
                            <div className="flower_"/>
                            <h2>{title}</h2>
                            <div className="flower_"/>
                        </div>
                        {this.Slide(data, classes, settings, class_name)}
                    </div>  
                </div>            
        )
    }
}

SlickComponent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SlickComponent);

/* style={require('../../static/images/')} */