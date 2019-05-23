import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';




const styles = theme => ({
    bg_showcase:{
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#f5f5f5",
        height: 500,
        width: "100%",
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
        position: "relative",
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
        width: "100%",
        margin: 0,
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
        fontFamily: "'Open Sans',Helvetica,Arial,Sans-Serif",
        fontSize: 20,
        letterSpacing: 3,
        textTransform: "lowercase",
        lineHeight: "2em",
        backgroundColor: "#ffffff87",
        padding: 10,
        borderRadius: 5,
        color: "#222"
    },
    B_inside_p:{
        fontSize: 22,
        textTransform: "uppercase"
    },
    under_p_:{
        fontFamily: "'Open Sans',Helvetica,Arial,Sans-Serif",
        fontSize: 14,
        letterSpacing: 3,
        textTransform: "lowercase",
        lineHeight: "2em",
        backgroundColor: "#ffffff87",
        padding: 10,
        borderRadius: 5,
        color: "#222"
    },
    under_B_inside_p:{
        fontSize: 18,
        textTransform: "uppercase"
    }
})

class home extends Component {
    render() {
        const { classes } = this.props
        return (
                <div id="home">
                    <div id="show_case">
                            <div id="bg_1" className={classes.bg_showcase}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Womens</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Womens`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Womens</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Womens`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            <div id="bg_2" className={classes.bg_showcase}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Kids</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/kids`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Kids</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/kids`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                            </div>
                            <div id="bg_3" className={classes.bg_showcase}>
                                <div className={classes.left_side_text}>
                                    <p className={classes.p_}><b className={classes.B_inside_p}>Find More</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Sale`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
                                </div>
                            </div>
                            <div  className={classes.under_side_text}>
                                    <p className={classes.under_p_}><b className={classes.under_B_inside_p}>Find More</b> <br/> Id enim pariatur qui eiusmod. Ad velit mollit sint est in id culpa proident elit aliquip .</p> 
                                    <Button component={Link} to={`/Sale`} variant="contained" color="primary" classes={{root: classes.button}}>Explore</Button>  
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
