import React, { Component } from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from "@material-ui/core/TextField";
import CustomButton from '../CustomButton/CustomButton';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#ff8989' }, 
      type: "dark"
    },
});

const styles = (theme) =>({
    News_sub_title: {
        textAlign: "center",
        display: "flex",
        margin: `0 ${theme.spacing(1)}px`,
        textTransform: "uppercase",
        color: "#fff",
        letterSpacing: 2,
        overflow: 'hidden'
    },

    textField: {
        margin: `0 ${theme.spacing(1)}px`,
        width: "70%",
        maxWidth: 700,
        minWidth: 250,
    },

    cssLabel: {
        color : '#ec6d6d',
    },
    
    FormControll:{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        width: "100%",
        margin: "30px 0",
        overflow: "hidden",
        [theme.breakpoints.down('xs')]: {
          justifyContent: "center",
        }, 
    },
})

class NewsLetter extends Component {
    constructor(){
        super();
        this.state = {
            Email_User: ""
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    };
    
    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={theme}>
            <div className="News_sub">
                <div className={classes.News_sub_title}>
                    <h2>subscribe to our newslletter</h2>
                </div>
                <form className={classes.FormControll}>
                                  
                    <TextField 
                        classes={{root: classes.textField}} 
                        value={this.state.Email_User} 
                        label="Email" 
                        onChange={this.handleChange("Email_User")}
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,  
                                },
                        }}
                    />

                    <CustomButton 
                        className={classes.button_2}
                        btnValue="subscribe"
                    />

                </form>
            </div>
            </ThemeProvider>
        )
    }
}

NewsLetter.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewsLetter);
