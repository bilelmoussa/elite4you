import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff8989' }, 
  },
});

const styles = (theme) =>({
    button:{
          margin: theme.spacing(1),
          color: '#ffffff',
          [theme.breakpoints.down('xs')]: {
            width: 250,
            margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
          }, 
    },
})

class CustomButton extends Component {
  render() {
    const {classes} = this.props;
    return (
      <ThemeProvider theme={theme}>
          <Button className={classes.button}  variant="contained" color="primary">{this.props.btnValue}</Button>
      </ThemeProvider>
    )
  }
}

CustomButton.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomButton)



