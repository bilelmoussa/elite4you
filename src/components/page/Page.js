import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';



const styles = theme =>({
    PanelDetailes:{
        flexDirection: "column"
    },
    Expansion_Panel:{
        margin: "0 !important",
        boxShadow: "none !important" 
    },
    Bread_crumbs:{
        margin: "15px 20px"
    },
    Panel_Link:{
        margin: "5px 0",
        textDecoration: "none !important"
    },
    textField:{
        margin: "10px" 
    },
    form:{
        display: "flex",
        flexDirection: "column"
    },
    Button:{
        width: 150,
        overflow: "hidden",
        margin: "20px auto"
    },
    FilterSubLink:{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    },
    SubLinks:{
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
    },
    PanelTitle:{
        textTransform: "uppercase"
    },
    ChipContainer:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: '20px 0',
    },
    chip: {  
        margin: theme.spacing(0.5),
    },
})



class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            White: false,
            Yellow: false,
            Orange: false,
            Red: false,
            Pink: false,
            Purple: false,
            Blue: false,
            Green: false,
            Black: false,
            M: false,
            L: false,
            XL: false,
            S: false,
            XXL: false,
            MinPrice: "",
            MaxPrice: "",
            Filters: [],
        }
    }

    handleChange  = (name) => event =>{
        this.setState({...this.state, [name]: event.target.checked});
        this.AddFilter(name);
    }

    handleInputChange = name => event => {
        this.setState({[name]: event.target.value });
    }

    handlePriceSubmit = (event)=>{
        event.preventDefault();
        const {MinPrice, MaxPrice} = this.state;
        const value = `${MinPrice}-${MaxPrice}`;
        this.AddFilter(value);
        this.setState({MinPrice: "", MaxPrice: ""});
    }

    handleDelete = filter => () =>{
        const {Filters} = this.state;
        const chipToDelete = Filters.indexOf(filter);
        Filters.splice(chipToDelete, 1);
        this.setState({ProductColors: Filters, [filter]: false})
    }

    AddFilter = (value) =>{
        const { Filters } = this.state;
        this.setState({Filters: [...Filters, value]});
    }

    render() {
        const {classes, pathname} = this.props;
        const pathnameLength = (pathname.match(/\//g) || []).length;
        let paths = [];

        if(/\/$/g.test(pathname)){
            if(pathnameLength === 2){
                paths.push(pathname.replace(/\/(\w+)\//, '$1'));
            }else if(pathnameLength === 3){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\//, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\//, '$2'));
            }else if(pathnameLength === 4){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\//, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\//, '$2'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\//, '$3'));
            }else if(pathnameLength === 5){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$2'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$3'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$4'));
            }else if(pathnameLength === 6){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$2'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$3'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$4'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, '$5'));
            }
        }else{
            if(pathnameLength === 1){
                paths.push(pathname.replace(/\/(\w+)/, '$1'));
            }else if(pathnameLength === 2){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)/, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)/, '$2'));
            }else if(pathnameLength === 3){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)/, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)/, '$2'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)/, '$3'));
            }else if(pathnameLength === 4){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$2'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$3'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$4'));
            }else if(pathnameLength === 5){
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$1'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$2'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$3'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$4'));
                paths.push(pathname.replace(/\/(\w+)\/(\w+)\/(\w+)\/(\w+)\/(\w+)/, '$5'));
            }
        }

        const BreadContent = ()=>{
            return(
                paths.map((path, i)=>{
                    if(/\/$/g.test(pathname)){
                        if(pathnameLength-2 === i){
                            return(
                                <Typography key={i} color="textPrimary">{path}</Typography>
                            )
                        }else{
                            if(path === "home"){
                                return(
                                    <Link key={i} color="inherit" href={`/#home`}>
                                        {path}
                                    </Link>
                                   )
                            }else{
                                return(
                                    <Link key={i} color="inherit" href={`/home/${path}`}>
                                        {path}
                                    </Link>
                                   )
                            }
                           
                        }
                    }else{
                        if(pathnameLength-1 === i){
                            return(
                                <Typography key={i} color="textPrimary">{path}</Typography>
                            )
                        }else{
                            if(path === "home"){
                                return(
                                    <Link key={i} color="inherit" href={`/#home`}>
                                        {path}
                                    </Link>
                                   )
                            }else{
                                return(
                                    <Link key={i} color="inherit" href={`/home/${path}`}>
                                        {path}
                                    </Link>
                                   )
                            }
                           
                        }
                    }   
                 })
            )
        };

        const ColorsPicker = ()=>{
            return(
            <FormGroup row={false}>
                { ['White', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Blue', 'Green', 'Black'].map((color, i)=>{
                        return(
                            <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                color="default" 
                                checked={this.state[color]} 
                                onChange={this.handleChange(color)}
                                value={color} 
                                />
                            }
                            label={color}
                          />
                        )
                    })}
            </FormGroup>
            )
        }

        const SizePicker = ()=>{
            return(
            <FormGroup row={false}>
                { ['M', 'L', 'XL', 'S', 'XXL'].map((size, i)=>{
                        return(
                            <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                color="default" 
                                checked={this.state[size]} 
                                onChange={this.handleChange(size)}
                                value={size} 
                                />
                            }
                            label={size}
                          />
                        )
                    })}
            </FormGroup>
            )
        }

        const defaultRefine = ()=>{
                if(this.state.Filters.length === 0){
                    return(
                        <p>No filters applied</p>
                    )
                }else{
                    return null;
                }
            
        }

        return (
            <div className="page_container">
                <div className="page_title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="page_content">  
                    <div className="side_filter_nav">
                        <Breadcrumbs aria-label="Breadcrumb" className={classes.Bread_crumbs}>
                            {BreadContent()}
                        </Breadcrumbs>
                        <div className={classes.FilterSubLink}>
                            <h3 className={classes.PanelTitle}>{this.props.title}</h3>
                            <div className={classes.SubLinks}>
                                <Link className={classes.Panel_Link}  color="inherit" href={`${pathname}/clothing`}>Clothing</Link>
                                    <Link className={classes.Panel_Link}  color="inherit" href={`${pathname}/Shoes`}>Shoes</Link>
                                    <Link className={classes.Panel_Link} color="inherit" href={`${pathname}/Accessories`}>Accessories</Link>
                            </div>
                        </div>
                        <div className={classes.FilterSubLink}>
                            <h3 className={classes.PanelTitle}>refine by</h3>
                            <div className={classes.ChipContainer}>
                                {defaultRefine()}
                                {this.state.Filters.map((filter, i)=>(
                                    <Chip
                                        key={i}
                                        label={filter}
                                        className={classes.chip}
                                        onDelete={this.handleDelete(filter)} 
                                    />
                                    ))}
                            </div>
                        </div>
                        
                        <ExpansionPanel className={classes.Expansion_Panel} defaultExpanded>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <h3 className={classes.PanelTitle}>Colors</h3>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.PanelDetailes}>
                                {ColorsPicker()}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel className={classes.Expansion_Panel} defaultExpanded>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <h3 className={classes.PanelTitle}>Size</h3>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.PanelDetailes}>
                                {SizePicker()}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel className={classes.Expansion_Panel} defaultExpanded>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <h3 className={classes.PanelTitle}>Price</h3>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <form className={classes.form} onSubmit={this.handlePriceSubmit} >
                                    <NumberFormat
                                        classes={{root: classes.textField}} 
                                        customInput={TextField}
                                        label="Min Price"
                                        value={this.state.MinPrice}
                                        onChange={this.handleInputChange("MinPrice")}
                                        margin="normal"
                                        allowNegative={false}
                                    />
                                    <NumberFormat
                                        classes={{root: classes.textField}} 
                                        customInput={TextField}
                                        label="Max Price"
                                        value={this.state.MaxPrice}
                                        onChange={this.handleInputChange("MaxPrice")}
                                        margin="normal"
                                        allowNegative={false}
                                    />
                                    <Button type="submit" className={classes.Button} variant="contained" color="primary">Update</Button>
                                </form>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    
                    </div>

                </div>
            </div>
        )
    }
}

Page.protoType = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Page);