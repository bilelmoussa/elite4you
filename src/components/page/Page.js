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
import Visibility from '@material-ui/icons/Visibility'
import {empty} from '../../is-empty';
import ProductDialog from '../../StyleComponents/ProductDialog/ProductDialog';

const styles = theme =>({
    PanelDetailes:{
        flexDirection: "column"
    },
    Expansion_Panel:{
        margin: "0 !important",
        boxShadow: "none !important" 
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
    ButtonProduct:{
        width: 150,
        overflow: "hidden",
        margin: "0 auto",
        backgroundColor:"#ec6d6d",
        '&:hover':{
            backgroundColor: "#bd5555"
        }
    }
})



class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            DialogOpen: false,
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
            DialogProduct: {},
            Products : [
                {
                    ProductImage: "Gallery_1.webp",
                    ProductName: "Knotted T-Shirt Midi Dress",
                    ProductPrice: 20.00,
                    ProductOldPrice: 35.00,
                    Discount: 10,
                },
                {
                    ProductImage: "Gallery_2.jpg",
                    ProductName: "Zoey Button Up Tie-Front Maxi Dress",
                    ProductPrice: 20.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                },
                {
                    ProductImage: "Gallery_3.jpg",
                    ProductName: "Harlee Printed Button Front Midi Dress",
                    ProductPrice: 30.00,
                    ProductOldPrice: 39.00,
                    Discount: 10,
                    newProduct: true
                }
            ],
        }
    }

    handleChange  = (name) => event =>{
        this.setState({...this.state, [name]: event.target.checked});
        const {Filters} = this.state;
        const FilterDelete = Filters.indexOf(name);
        if(FilterDelete === -1){
            this.AddFilter(name);
        }else{
            Filters.splice(FilterDelete, 1);
        }
    }

    handleInputChange = name => event => {
        this.setState({[name]: event.target.value });
    }

    filterPrice(){
        const {Filters} = this.state;
        Filters.forEach((filter, i)=>{
            if(/(\d+)-(\d+)/.test(filter)){
                const FilterDelete = Filters.indexOf(filter);
                Filters.splice(FilterDelete, 1);
                this.setState({Filters: Filters});
            }
        })
    }

    handlePriceSubmit = (event)=>{
        event.preventDefault();
        const {MinPrice, MaxPrice} = this.state;
        const value = `${MinPrice}-${MaxPrice}`;
        this.filterPrice();
        if(!empty(MinPrice) || !empty(MaxPrice)){
            this.AddFilter(value);
        }
        this.setState({MinPrice: "", MaxPrice: ""});
    }

    handleDelete = filter => () =>{
        const {Filters} = this.state;
        const chipToDelete = Filters.indexOf(filter);
        Filters.splice(chipToDelete, 1);
        this.setState({ProductColors: Filters, [filter]: false, MinPrice: "", MaxPrice: ""})
    }

    AddFilter = (value) =>{
        const { Filters } = this.state;
        this.setState({Filters: [...Filters, value]});
    }

    Discount(d){
        if(d.Discount !== 0 && d.Discount){
            return(
                <div className="DiscountTag" style={{margin: "20px 30px"}}>-{d.Discount}%</div>
            )
        }else{
            return null;
        }
    }

    NewProduct(d){
        if(d.newProduct){
            return(
                <div className="NewTag" style={{margin: "20px 30px"}}>New</div>
            )
        }else{
            return null;
        }
    }

    ProductInfo(d){
        if(d.ProductOldPrice !== 0 && d.ProductOldPrice){
            return(
                <div className="under_Img_Gallery">
                    <p className="slide_title">{d.ProductName}</p>
                    <p className="Slide_Price"><b className="old_price">${d.ProductOldPrice}</b>${d.ProductPrice}</p>
                </div>
            )
        }else{
            return(
                <div className="under_Img_Gallery">
                    <p className="slide_title">{d.ProductName}</p>
                    <p className="Slide_Price">${d.ProductPrice}</p>
                </div>
            )
        }   
    }

    handleDialogOpen = (product) => () => {
        this.setState({DialogOpen: true, DialogProduct: product});
    }
    
    handleDialogClose = ()=> {
        this.setState({DialogOpen: false})
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

        const RenderProduts = ()=>{
            if(this.state.Products.length === 0){
                return(
                    <p>No Products are Added yet !</p>
                )
            }else{
                return(
                    this.state.Products.map((d, i)=>{
                       return(
                        <div key={i} className="ProductCard">
                            <div className="ProductOnHoverBG"></div>
                            <div className="ProductOnHoverInfo">
                                <Visibility className="VisibilityProduct" onClick={this.handleDialogOpen(d)}/>
                                <Button className={classes.ButtonProduct} variant="contained" color="primary">add to cart</Button>
                            </div>
                            {this.Discount(d)}
                            {this.NewProduct(d)}
                            <img className="ProductImg" alt="" src={require(`../../static/${d.ProductImage}`)}/>
                            {this.ProductInfo(d)}
                        </div>
                       )
                    })
                    
                );
            }
        }

        const RenderFilter = () =>{
            return(
                <div className="side_filter_nav">
                        <Breadcrumbs aria-label="Breadcrumb" className="DesktopBreadcrumb">
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

            )
        }

        return (
            <div className="page_container">
                <div className="page_title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="page_content">
                    <Breadcrumbs aria-label="Breadcrumb" className="MobileBread">
                            {BreadContent()}
                    </Breadcrumbs>
                    <ExpansionPanel className="Expansion_Panel">
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <h3 className={classes.PanelTitle}>Filter</h3>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.PanelDetailes}>
                            {RenderFilter()}
                            </ExpansionPanelDetails>
                    </ExpansionPanel>  

                    <div className="desktopFilter">
                        {RenderFilter()}
                    </div>
                    

                    <div className="ProductRows">
                        {RenderProduts()} 
                    </div>  

                </div>
                <ProductDialog open={this.state.DialogOpen} handleDialogClose={this.handleDialogClose} product={this.state.DialogProduct} />
            </div>
        )
    }
}

Page.protoType = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Page);