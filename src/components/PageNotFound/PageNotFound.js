import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Report from '@material-ui/icons/Report';



const styles = theme =>({
    dialog:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        minWidth: 300,
        minHeight: 650,
        overflow: "hidden",
        backgroundColor: "#252525",
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
        justifyContent: "center",
        alignItems: "center",
        color: '#fff',
        backgroundColor: '#333',
    },
    Avatar:{
        width: '25%',
        minWidth: 130,
        height: 'auto',
        margin: '10px auto',
    },
    Report:{
        width: '100%',
        height: '100%'
    },
    P404:{
        margin: '20px 0',
        padding: '30px 25px',
        fontSize: '3em',
        borderRadius: '50%',
        backgroundColor: '#565656'
    },
    P404_title:{
        margin: '20px 0',
        letterSpacing: 3,
        textAlign: 'center'
    }
})

class PageNotFound extends Component {
    render() {
        const {classes} = this.props;
        
        return (
                <div className={classes.dialog}>
                    <Paper className={classes.paper}>
                        <div className={classes.Avatar}>
                            <Report className={classes.Report}/>
                        </div>
                        <div className={classes.P404}>
                            404
                        </div>
                        <h1 className={classes.P404_title}>Page Not Found !</h1>
                    </Paper>
                </div>
        )
    }
}

PageNotFound.protoType = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PageNotFound);
