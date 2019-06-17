import React, { Component } from 'react'
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router-dom';
import Womens from '../Womens/Womens';
import Kids from '../Kids/Kids';
import Sale from '../Sale/Sale';
import NewProducts from '../NewProducts/NewProducts';
import Trend from '../Trend/Trend';
import ContactUs from '../ContactUs/ContactUs';
import AboutUs from '../AboutUs/AboutUs';
import home from '../home/home';
import NewsLetter from '../../StyleComponents/NewsLetter/NewsLetter';
import Navigation from '../../StyleComponents/Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: "light"
  },
});

const theme_2 = createMuiTheme({
  palette: {
    type: "dark"
  },
});

const drawerWidth = 280;

const styles = theme => ({ 
  root: {
    display: 'flex',
  }, 
  content: {
    flexGrow: 1,
    width: "100%",
    margin: "32px 0 0 0",
    padding: `${theme.spacing(3)}px 0 0 0`,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  footer:{
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    backgroundColor: '#222',
    justifyContent: "space-around",
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column"
    },
  },

  Footer_List_Text:{
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: "'Orbitron', sans-serif;",
    color: '#f1f1f1',
    textTransform: "capitalize",
    [theme.breakpoints.down('xs')]: {
      fontSize: 8,
    },
  },
  
  List_Item:{
    textAlign: "center",
  },

  ListMenu:{
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      width: '200px',
      margin: '0 auto'
    },
  },

  rootListText:{
    padding: "8px 15px"
  },

  List_Name:{
    textAlign: "center",
    color: "#ffffff",
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "capitalize",
    margin: '20px 0',
    fontFamily: "'Orbitron', sans-serif",
    padding: 8,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  }
  
})


class Client extends Component {
 
  render() {
    const { classes } = this.props;
 
    return (
      <div className={classes.root}>
        <CssBaseline />
        <ThemeProvider theme={theme} >

        <Navigation />

        <main className={classes.content}>

                              <Switch>
                                    <Route exact path={'/home'} component={home} />
                                    <Route exact path={'/home/Womens'} component={Womens} />
                                    <Route exact path={'/home/Kids'} component={Kids} />
                                    <Route exact path={'/home/Sale'} component={Sale} />
                                    <Route exact path={'/home/NewProducts'} component={NewProducts} />
                                    <Route exact path={'/home/Trend'} component={Trend} />
                                    <Route exact path={'/home/ContactUs'} component={ContactUs} />
                                    <Route exact path={'/home/AboutUs'} component={AboutUs} />
                                    <Route component={PageNotFound}/>
                              </Switch>

                          <NewsLetter />

                        <ThemeProvider theme={theme_2} >
                        <div className={classes.footer}>
                              <List className={classes.ListMenu}>
                                  <p className={classes.List_Name}>useful links</p>          
                                  <ListItem button  classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="About us" />
                                  </ListItem>
                                  <ListItem  button classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="My account" />
                                  </ListItem>
                              </List>

                              <List className={classes.ListMenu}>
                                  <p className={classes.List_Name}>help</p>          
                                  <ListItem button  classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="Contact Us" />
                                  </ListItem>
                                  <ListItem  button classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="FAQ" />
                                  </ListItem>
                                  <ListItem  button classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="shipping" />
                                  </ListItem>
                                  <ListItem  button classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="payment" />
                                  </ListItem>
                              </List>

                              <List className={classes.ListMenu}>
                                  <p className={classes.List_Name}>Social media</p>          
                                  <ListItem button  classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="facebook" />
                                  </ListItem>
                                  <ListItem  button classes={{root:classes.List_Item, button: classes.rootListText}}>
                                    <ListItemText classes={{primary: classes.Footer_List_Text}} primary="instagram" />
                                  </ListItem>
                              </List>

                        </div>
                        </ThemeProvider>

              </main>
              </ThemeProvider>

      </div>
    )
  }
}

Client.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Client)
