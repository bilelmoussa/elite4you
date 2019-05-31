import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import {logoutUser} from '../../../../action/authentication';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dashboard from '@material-ui/icons/Dashboard';
import AddBox from '@material-ui/icons/AddBox';
import Group from '@material-ui/icons/Group';
import Home from '@material-ui/icons/Home';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../../../PageNotFound/PageNotFound';
import DashboardHome from './DashboardHomeComponents/DashboardHome';
import AddProduct from '../AddProductComponents/AddProduct';
import Users from '../UsersComponents/Users'

const drawerWidth = 260;

const styles = theme =>({
    dashboard:{
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "#252525",
        overflow: "hidden",
        minHeight: 650,
        minWidth: 300
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        marginLeft: drawerWidth,
        backgroundColor: "#8a5fde",
        minWidth: 300,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        [theme.breakpoints.down('sm')]: {
            marginLeft: "0 !important",
            width: "100% !important"
        }
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    menuButton: {
        marginRight: 20,

        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            padding: 9,
        },
    },
    Title:{
        letterSpacing: 5,
        textDecoration: "none",
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            letterSpacing: 2,
            fontSize: "1em"
        }
    },
    MoreIcon:{
        [theme.breakpoints.down('xs')]: {
            padding: 9,
        },
    },
    drawer: {
          width: drawerWidth,
          flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        width: "100%",
        margin: "32px 0 0 0",
        padding: `${theme.spacing(3)}px 0 0 0`,
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: -drawerWidth,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: `${-drawerWidth}px !important`,
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    InsidePaper:{
        display: 'flex',
        flexDirection: "column",
        height: "100%"
    },
    List_Item:{
        textAlign: "center",
    },
      List_Text:{
        textTransform: 'uppercase',
        fontSize: 14,
        letterSpacing: 2,
        fontFamily: "'Orbitron', sans-serif;"
    },
    bg_:{
        position: "absolute",
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#252525",
        overflow: "hidden",
        minHeight: 650,
        minWidth: 300,
        zIndex: -1,
    }
})

class DashboardComponent extends Component {
    constructor(){
        super();
        this.state = {
            IsLoggedIn: false,
            user: '',
            MenuOpen: false,
            MoreAnchorEl: null,
            mobileOpen: false,
            open: true,
        }
    }

    
    componentDidMount() {
        this.setState({IsLoggedIn: this.props.user.IsLoggedIn})   
		if(!this.state.IsLoggedIn) { 
            this.props.history.push('/Admin/login');
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

    handleDrawerToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleMobileDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleMenuOpen = event => {
        this.setState({ MoreAnchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ MoreAnchorEl: null });
    };

    onLogout(e){
		e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    handleCloseBtn = () =>{
        this.setState({MenuOpen: false})
    };

    handleDrawerClose = () =>{
        this.setState({open: false})
    }

    handleMobileDrawerClose = () =>{
        this.setState({mobileOpen: false})
    }
    
    render() {
        const {classes} = this.props;
        const { MoreAnchorEl, open } = this.state;
        const isMenuOpen = Boolean(MoreAnchorEl);

        const renderMenu = (
            <Menu
              anchorEl={MoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );
        
        const drawer = (theme)=>{
            return(
                <div className={classes.InsidePaper}>
                        <Hidden mdUp implementation="css">
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={this.handleMobileDrawerToggle}>
                                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                <ListItem onClick={this.handleMobileDrawerClose}  component={Link} to={`/client`} button  className={classes.List_Item}>
                                    <ListItemIcon>
                                        <Home style={styles.account_circle} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.List_Text}} primary="home" />
                                </ListItem>
                                <ListItem onClick={this.handleMobileDrawerClose}  component={Link} to={`/Admin/dashboard`} button  className={classes.List_Item}>
                                <ListItemIcon>
                                    <Dashboard style={styles.account_circle} />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.List_Text}} primary="dashboard" />
                                </ListItem>
                                <ListItem onClick={this.handleMobileDrawerClose}  component={Link} to={`/Admin/dashboard/add-product`} button  className={classes.List_Item}>
                                <ListItemIcon>
                                    <AddBox style={styles.account_circle} />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.List_Text}} primary="Add Product" />
                                </ListItem>
                                <ListItem onClick={this.handleMobileDrawerClose}  component={Link} to={`/Admin/dashboard/users`} button  className={classes.List_Item}>
                                <ListItemIcon>
                                    <Group style={styles.account_circle} />
                                </ListItemIcon>
                                <ListItemText classes={{primary: classes.List_Text}} primary="users" />
                                </ListItem>   
                            </List>
                        </Hidden>
                        <Hidden smDown implementation="css">
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={this.handleDrawerToggle}>
                                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                    </IconButton>
                                </div>
                                <Divider />
                                <List>
                                    <ListItem onClick={this.handleDrawerClose}  component={Link} to={`/client`} button  className={classes.List_Item}>
                                        <ListItemIcon>
                                            <Home style={styles.account_circle} />
                                        </ListItemIcon>
                                        <ListItemText classes={{primary: classes.List_Text}} primary="home" />
                                    </ListItem>
                                    <ListItem onClick={this.handleDrawerClose}  component={Link} to={`/Admin/dashboard`} button  className={classes.List_Item}>
                                    <ListItemIcon>
                                        <Dashboard style={styles.account_circle} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.List_Text}} primary="dashboard" />
                                    </ListItem>
                                    <ListItem onClick={this.handleDrawerClose}  component={Link} to={`/Admin/dashboard/add-product`} button  className={classes.List_Item}>
                                    <ListItemIcon>
                                        <AddBox style={styles.account_circle} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.List_Text}} primary="Add Product" />
                                    </ListItem>
                                    <ListItem onClick={this.handleDrawerClose}  component={Link} to={`/Admin/dashboard/users`} button  className={classes.List_Item}>
                                    <ListItemIcon>
                                        <Group style={styles.account_circle} />
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.List_Text}} primary="users" />
                                    </ListItem>   
                                </List>
                        </Hidden>
                </div>   
            )
        }
        
        const theme = createMuiTheme({
            palette: {
                type: 'dark',
                primary: {main: '#8a5fde'}
            },
        });

        return (
            <ThemeProvider theme={theme}>
                <div className={classes.bg_} />
                <div className={classes.dashboard}>
                    <AppBar 
                        position="fixed"
                        className={clsx(classes.appBar, {[classes.appBarShift]: open})}
                    >
                        <Toolbar>
                                <Hidden mdUp implementation="css">
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleMobileDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography onClick={this.handleMobileDrawerClose} component={Link} to={`/Admin/dashboard`} className={classes.Title}  variant="h6" color="inherit">
                                    Dashboard
                                </Typography>
                                </Hidden>
                                <Hidden smDown implementation="css">
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={clsx(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography onClick={this.handleDrawerClose} component={Link} to={`/Admin/dashboard`} className={classes.Title}  variant="h6" color="inherit">
                                    Dashboard
                                </Typography>
                                </Hidden>

                                
                                <div className={classes.grow} />
                                <Button 
                                    color="inherit"
                                    onClick={this.onLogout.bind(this)}
                                >
						            <ExitToApp />
						            Logout
					            </Button>
                                <IconButton className={classes.MoreIcon} aria-haspopup="true" onClick={this.handleMenuOpen} color="inherit">
                                    <MoreIcon />
                              </IconButton>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    <nav className={classes.drawer}>
                        <Hidden mdUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleMobileDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer(theme)}
                        </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                    container={this.props.container}
                                    variant="persistent"
                                    anchor="left"
                                    open={this.state.open}
                                    onClose={this.handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                            {drawer(theme)}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={clsx(classes.content, open &&   classes.contentShift)}>
                        <Switch>
                            <Route exact path='/Admin/dashboard/' component={DashboardHome} />
                            <Route exact path='/Admin/dashboard/add-product' component={AddProduct}/>
                            <Route exact path='/Admin/dashboard/users' component={Users} />
                            <Route component={PageNotFound} />
                        </Switch>               
                    </main>
                </div>    
            </ThemeProvider>    
        )
    }
}

DashboardComponent.protoType = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(DashboardComponent))
