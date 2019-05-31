import React, { Component } from 'react'
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { LogInUser } from '../../action/authentication'

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    },
});

const styles = theme =>({
    login:{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        height: "100%",
        width: "100%",
        minWidth: 300,
        backgroundColor: "#252525",
        overflow: "hidden",
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        padding: theme.spacing(3, 2),
        width: "35%",
        minWidth: 300,
        maxWidth: 800,
        margin: "auto",
        overflow: "hidden",
    },
    Avatar:{
        width: '25%',
        minWidth: 130,
        height: 'auto',
        margin: '10px auto',
    },
    AccountCircle:{
        width: '100%',
        height: '100%'
    },
    form:{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        overflow: "hidden",
    },
    textField: {
        width: "70%",
        maxWidth: 700,
        minWidth: 250,
        margin: `20px auto`,
    },
    button:{
        width: "70%",
        minWidth: 250,
        margin: '20px auto', 
  },
});

class LogIn extends Component {
    constructor(){
        super();
        this.state={
            UserName: "",
            Password: "",
            IsLoggedIn: false
        }
    }


    componentDidMount() {
        this.setState({IsLoggedIn: this.props.user.IsLoggedIn})   
		if(this.state.IsLoggedIn) {
			this.props.history.push('/Admin/dashboard');
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            return {IsLoggedIn: nextProps.user.IsLoggedIn}
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            this.setState({
                IsLoggedIn: this.props.user.IsLoggedIn
            })
        }else{
            return null;
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        const user = {
            UserName: this.state.UserName,
            Password: this.state.Password
        }
        this.props.LogInUser(user, this.props.history)
    };

    render() {
        const {classes} = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div className="container_route">
                    <div className={classes.login}>
                        <Paper className={classes.paper}>
                                <div className={classes.Avatar}>
                                    <AccountCircle className={classes.AccountCircle}/>
                                </div>
                                <form className={classes.form} onSubmit={this.handleSubmit}>
                                    <TextField 
                                        classes={{root: classes.textField}} 
                                        value={this.state.UserName} 
                                        label="Username" 
                                        onChange={this.handleChange("UserName")}
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <TextField 
                                        classes={{root: classes.textField}} 
                                        value={this.state.Password} 
                                        type="password"
                                        label="Password" 
                                        onChange={this.handleChange("Password")}
                                        margin="normal"
                                        variant="filled"
                                    />
                                    <Button 
                                        className={classes.button}  variant="contained" 
                                        color="primary"
                                        type="submit"
                                    >
                                        login
                                    </Button> 
                                </form>
                        </Paper>         
                    </div>
                </div>    
            </ThemeProvider>
        )
    }
}

LogIn.protoType = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    LogInUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, {LogInUser})(withStyles(styles)(LogIn))