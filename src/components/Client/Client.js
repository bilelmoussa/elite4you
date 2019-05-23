import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore'
import { Route, Switch, Link } from 'react-router-dom';
import Womens from '../Womens/Womens';
import Kids from '../Kids/Kids';
import Sale from '../Sale/Sale';
import NewProducts from '../NewProducts/NewProducts';
import Trend from '../Trend/Trend';
import ContactUs from '../ContactUs/ContactUs';
import AboutUs from '../AboutUs/AboutUs'
import home from '../home/home'


const drawerWidth = 280;

const styles = theme => ({ 
  root: {
    display: 'flex',
  }, 
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: '#ec6d6d',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  Title:{
    letterSpacing: 5,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    fontFamily: "'Dancing Script', cursive;",
    textDecoration: "none"
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor: "#fff",
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    margin: 0,
    padding: `${theme.spacing.unit * 3}px 0px`,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  List_Item:{
    textAlign: "center"
  },
  List_Text:{
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: "'Orbitron', sans-serif;"
  },
  InsidePaper:{
    display: 'flex',
    flexDirection: "column",
    height: "100%"
  },
  Last_Item:{
    margin: "auto 0 20px 0 !important",
  },
  Social_media: {
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
    justifyContent: "space-evenly",
    backgroundColor: "#f3f3f3",
  },
})


const pagenotfound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class Client extends Component {
  constructor(){
    super();
    this.state = {
      mobileOpen: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    }

  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );


    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
                <Badge badgeContent={1} color="secondary">
                <LocalGroceryStore />
                </Badge>
            </IconButton>
            <p>Cart</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const drawer = (
      <div className={classes.InsidePaper}>
        <div className={classes.toolbar} />
        <Typography component={Link} to={`/`} className="title"  variant="h3" color="inherit" noWrap>
              Elite4Her
        </Typography>
        <Divider />
        <List>
            <ListItem  component={Link} to={`/Womens`} button  className={classes.List_Item}>
              <ListItemText classes={{primary: classes.List_Text}} primary="Womens" />
            </ListItem>
            <ListItem component={Link} to={`/Kids`} button className={classes.List_Item}>
              <ListItemText classes={{primary: classes.List_Text}} primary="Kids" />
            </ListItem>
            <ListItem component={Link} to={`/Sale`} button className={classes.List_Item}>
              <ListItemText classes={{primary: classes.List_Text}} primary="Sale" />
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem component={Link} to={`/New-Products`} button  className={classes.List_Item}>
            <ListItemText classes={{primary: classes.List_Text}} primary="New Products" />
        </ListItem>
        <ListItem component={Link} to={`/Trend`} button  className={classes.List_Item}>
            <ListItemText classes={{primary: classes.List_Text}} primary="Trend" />
        </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem component={Link} to={`/Contact-Us`} button  className={classes.List_Item}>
            <ListItemText classes={{primary: classes.List_Text}} primary="Contact Us" />
        </ListItem>
        <ListItem component={Link} to={`/About-Us`} button  className={classes.List_Item}>
            <ListItemText classes={{primary: classes.List_Text}} primary="About Us" />
        </ListItem>
        </List>
        <Divider />

        <List className={classes.Last_Item}>
            <div className={classes.Social_media}>
                <IconButton >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#424242"  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </IconButton>
                <IconButton >
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#424242" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </IconButton>
            </div>
        </List>

      </div>
    );

    return (
      <div className={classes.root}>
      <CssBaseline />
          	<AppBar className={classes.appBar} position="fixed">
                  <Toolbar>
                          <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                          >
                          <MenuIcon />
                          </IconButton>
                          <Typography component={Link} to={`/`} className={classes.Title}  variant="h4" color="inherit">
                              Elite4Her
                          </Typography>
                          <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                  <SearchIcon />
                                </div>
                                <InputBase
                                  placeholder="Search…"
                                  classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                  }}
                                />
                          </div>
                          <div className={classes.grow} />
                          <div className={classes.sectionDesktop}>
                                <IconButton color="inherit">
                                  <Badge badgeContent={1} color="secondary">
                                    <MailIcon />
                                  </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                  <Badge badgeContent={1} color="secondary">
                                    <NotificationsIcon />
                                  </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                  <Badge badgeContent={1} color="secondary">
                                      <LocalGroceryStore />
                                  </Badge>    
                                </IconButton>
                                <IconButton
                                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                  aria-haspopup="true"
                                  onClick={this.handleProfileMenuOpen}
                                  color="inherit"
                                >
                                  <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                              </IconButton>
                            </div>
                  </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
            <nav className={classes.drawer}>
                <Hidden mdUp implementation="css">
                    <Drawer
                      container={this.props.container}
                      variant="temporary"
                      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                      open={this.state.mobileOpen}
                      onClose={this.handleDrawerToggle}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                      {drawer}
                    </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                      <Drawer
                        classes={{
                          paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                      >
                        {drawer}
                      </Drawer>
                    </Hidden>
              </nav>
              <main className={classes.content}>
                <div className={classes.toolbar} />
 
                          <Switch>
                                <Route exact path={'/'} component={home} />
                                <Route exact path={'/Womens'} component={Womens} />
                                <Route exact path={'/Kids'} component={Kids} />
                                <Route exact path={'/Sale'} component={Sale} />
                                <Route exact path={'/New-Products'} component={NewProducts} />
                                <Route exact path={'/Trend'} component={Trend} />
                                <Route exact path={'/Contact-Us'} component={ContactUs} />
                                <Route exact path={'/About-Us'} component={AboutUs} />
                                <Route component={pagenotfound}/>
                          </Switch>  

              </main>
      </div>
    )
  }
}

Client.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Client)
