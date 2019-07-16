import React, { Component } from 'react'
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import 'react-responsive-ui/style.css'
import 'react-phone-number-input/style.css';
import Paper from '@material-ui/core/Paper';
import {checkEmail} from '../../IsEmail';
import PhoneInput from 'react-phone-number-input';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import labels from 'react-phone-number-input/locale/en';
import metadata from 'libphonenumber-js/metadata.min.json';
import InternationalIcon from 'react-phone-number-input/international-icon';
import CountrySelectReactResponsiveUI from '../../StyleComponents/PhoneSelect/PhoneSelect';
import { isValidPhoneNumber } from 'react-phone-number-input';
import createInput from '../../StyleComponents/PhoneInput/PhoneInput';
import {empty} from '../../is-empty';

const styles = theme =>({
    Paper:{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        minWidth: 300,
        maxWidth: 1000,
        margin: "40px auto",
        padding: 10
    },
    formControll:{
        display: "flex",
        margin: "20px auto",
        flexDirection: "column",
        width: "50%",
        minWidth: 250,
        maxWidth: 400,
    },
    label:{
        textTransform: "uppercase",
        letterSpacing: 1,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input:{
        border: "1px solid #ccc",
        paddingLeft: 5,
    },
    close: {
        padding: theme.spacing(0.5),
    },
});


class ContactUs extends Component {
    constructor(){
        super();
        this.state={
            phone: "",
            name: "",
            email: "",
            comment: "",
            errors: [],
        }
    }

    handleChange = (name) => event => {

        this.setState({...this.state, [name]: event.target.value, errors: []})
    }

    handlePhoneChange = value =>{
        this.setState({...this.state, phone: value, errors: []});
    }

    handeleSubmit = (event) =>{
        event.preventDefault();
        const {name,phone, email, errors, comment} = this.state;
        let Valid = true;

        if(!isValidPhoneNumber(phone)){
            let msg = "Phone Number is Not Valid !";
            if(errors.indexOf(msg) === -1){
                errors.push(msg);
                Valid = false;
                this.setState({errors: errors});
            }
        }

        if(!checkEmail(email)){
            let msg = "Email is Not Valid !";
            if(errors.indexOf(msg) === -1){
                errors.push(msg);
                Valid = false;
                this.setState({errors: errors});
            }
        }

        if(comment.length < 100){
            let msg = "At least 100 character in Comment Field !";
            if(errors.indexOf(msg) === -1){
                errors.push(msg);
                Valid = false;
                this.setState({errors: errors});
            }
        }

        if(Valid){
            const data = {
                comment: comment,
                fullName: name,
                email: email,
                phoneNumber: phone
            }
            console.log(data);
        }

    }

    render() {
        const { classes } = this.props;
        const  { errors } = this.state;

        const RenderErr = () =>{
            if(empty(errors)){
                return(null);
            }else{
                return (
                    <div className={classes.formControll} style={{backgroundColor: "#f00", padding: 10, borderRadius: 5}}>
                        {errors.map((err, i)=>{
                            return(<p style={{color: "#fff", fontSize: 16, marginBottom: 5}} key={i}>{err}</p>);
                        })}
                    </div>
                )
            }
        }

        return (
            <div style={{padding: "20px 10px", width: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{display: "flex", justifyContent: "center"}}><h1 style={{textTransform: "uppercase", letterSpacing: 1, paddingBottom: 10, borderBottom: "2px solid #ec6d6d", marginTop: 20, marginBottom: 20}}>Contact Us</h1></div>
                <Paper className={classes.Paper}>
                {RenderErr()}
                <form style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}} onSubmit={this.handeleSubmit}>
                    <div className={classes.formControll}>
                        <label className={classes.label}>Full name :</label>
                        <Input
                            required
                            value={ this.state.name }
                            onChange={this.handleChange('name')}
                            className={classes.input}
                        />
                    </div>
                    <div className={classes.formControll}>
                        <label className={classes.label}>Phone Number :</label>
                        <PhoneInput
                            inputComponent={createInput}
                            countrySelectComponent={CountrySelectReactResponsiveUI}
                            labels={labels}
                            metadata={metadata}
                            internationalIcon={InternationalIcon}
                            required
                            country="TN"
                            value={ this.state.value }
                            onChange={this.handlePhoneChange}
                        />
                    </div>
                    <div className={classes.formControll}>
                        <label className={classes.label}>Email :</label>
                        <Input
                            type="email"
                            required
                            value={ this.state.email }
                            onChange={this.handleChange('email')}
                            className={classes.input}
                        />
                    </div>
                    <div className={classes.formControll}>
                        <label className={classes.label}>Comments/Questions :</label>
                        <Input
                            multiline
                            rows={4}
                            required
                            value={ this.state.comment }
                            onChange={this.handleChange('comment')}
                            className={classes.input}
                        />
                        <p style={{textAlign: "right", margin: "10px 0"}}>{this.state.comment.length}/100</p>
                    </div>
                    <div className={classes.formControll}>
                        <Button 
                            variant='contained'
                            color="primary"
                            type="submit"
                            style={{margin: "0 auto", letterSpacing: 1, width: '100%'}}
                        >
                            Send
                        </Button>
                    </div>
                </form> 
                </Paper>
            </div>
        )
    }
}

ContactUs.protoType = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ContactUs)
