import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
import { Link } from 'react-router-dom';
import { AddToCart, GetProducts, ResetPageProducts, GetSize, GetColor } from '../../action/authentication';

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
        textDecoration: "none !important",
        textTransform: 'capitalize'
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
            DialogOpen: false,
            colors:{
            },
            size:{ 
            },
            MinPrice: "",
            MaxPrice: "",
            Filters: [],
            DialogProduct: {},
        }
    }

    componentDidMount(){
        this.props.ResetPageProducts();
        this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie});
        this.props.GetSize({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie});
        this.props.GetColor({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie});
    }

    handleColorChange  = (name) => event =>{
        this.setState({...this.state, colors: { ...this.state.colors, [name]: event.target.checked}});
        const {Filters} = this.state;
        let Filter_value = {value: name, categorie: "color"};
        const FilterDelete = Filters.map((e)=>{return e.value}).indexOf(Filter_value.value);
        const colors = [];
        const sizes = [];
        Filters.forEach((f)=>{
            if(f.categorie === "color"){
                colors.push(f.value)
            }
            if(f.categorie === "size"){
                sizes.push(f.value)
            }
        })

        if(FilterDelete === -1){
            colors.push(name);
            this.AddFilter(Filter_value);
            this.props.GetSize({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductColors: colors});
        }else{
            Filters.splice(FilterDelete, 1);
            let colorDelete = colors.indexOf(name);
            colors.splice(colorDelete, 1);
            let newStateColors = this.state.colors;
            delete newStateColors[name];
            this.setState({...this.state, colors: newStateColors});
            this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductColors: colors, ProductSize:sizes, gtePrice: this.state.MinPrice, ltePrice: this.state.MaxPrice});
            this.props.GetSize({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductColors: colors});
        }
    }

    handleSizeChange  = (name) => event =>{
        this.setState({...this.state, size:{...this.state.size,[name]: event.target.checked}});
        const {Filters} = this.state;
        let Filter_value = {value: name, categorie: "size"}
        const FilterDelete = Filters.map((e)=>{return e.value}).indexOf(Filter_value.value);
        const sizes = [];
        const colors = [];
        Filters.forEach((f)=>{
            if(f.categorie === "size"){
                sizes.push(f.value)
            }
            if(f.categorie === "color"){
                colors.push(f.value)
            }
        })
        if(FilterDelete === -1){
            sizes.push(name);
            this.AddFilter(Filter_value);
            this.props.GetColor({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes});
        }else{
            Filters.splice(FilterDelete, 1);
            let sizeDelete = sizes.indexOf(name);
            sizes.splice(sizeDelete, 1);
            let newStateSize = this.state.size;
            delete newStateSize[name];
            this.setState({ ...this.state, size: newStateSize});
            this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes, ProductColors: colors, gtePrice: this.state.MinPrice, ltePrice: this.state.MaxPrice});
            this.props.GetColor({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes});
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
        const {MinPrice, MaxPrice, Filters} = this.state;
        const value = {value:`${MinPrice}-${MaxPrice}`, categorie: 'price'};
        const FilterDelete = Filters.map((e)=>{return e.value}).indexOf(value.value);
        const FilterDeleteCat = Filters.map((e)=>{return e.categorie}).indexOf(value.categorie);
        Filters.splice(FilterDeleteCat, 1);            
        this.filterPrice();
        if(!empty(MinPrice) || !empty(MaxPrice)){
            if(FilterDelete === -1){
                this.AddFilter(value);
                const colors = [];
                const sizes = [];
                Filters.forEach((f)=>{
                    if(f.categorie === "color"){
                        colors.push(f.value)
                    }
                    if(f.categorie === "size"){
                        sizes.push(f.value)
                    }
                })
                this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes, ProductColors: colors, gtePrice: MinPrice, ltePrice: MaxPrice});
            }
        }
    }

    handleDelete = filter => () =>{
        const {Filters} = this.state;
        const chipToDelete = Filters.indexOf(filter);
        const colors = [];
        const sizes = [];
        let MaxPrice =  this.state.MaxPrice;
        let MinPrice = this.state.MinPrice;

        Filters.splice(chipToDelete, 1);

        Filters.forEach((f)=>{
            if(f.categorie === "color"){
                colors.push(f.value)
            }
            if(f.categorie === "size"){
                sizes.push(f.value)
            }
        })


        if(filter.categorie === "color"){
            this.setState(prevState => ({
                colors:{
                    ...prevState.colors,
                    [filter.value]: false
                }
            }))
        }

        if(filter.categorie === "size"){
            this.setState(prevState => ({
                size:{
                    ...prevState.size,
                    [filter.value]: false
                }
            }))
        }

        if(filter.categorie === "price"){
            this.setState({MinPrice: "", MaxPrice: ""});
            MaxPrice = "";
            MinPrice = "";
            this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes, ProductColors: colors, gtePrice: "", ltePrice: ""});
        }
        
        this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes, ProductColors: colors, gtePrice: MinPrice, ltePrice: MaxPrice});
        this.props.GetColor({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes});
        this.props.GetSize({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductColors: colors});
    }

    AddFilter = (value) =>{
        const { Filters } = this.state;
        const sizes = [];
        const colors = [];

        Filters.forEach((f)=>{
            if(f.categorie === "size"){
                sizes.push(f.value);
            }
            if(f.categorie === "color"){
                colors.push(f.value);
            }
        });

        if(value.categorie === "size"){
            sizes.push(value.value);
        }

        if(value.categorie === "color"){
            colors.push(value.value)
        }
        
        this.props.GetProducts({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes, ProductColors: colors});
        this.setState({Filters: [...Filters, value]});
        this.props.GetSize({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductColors: colors});
        this.props.GetColor({ProductCategories: this.props.categorie, ProductChildCategories: this.props.childCategorie, ProductSize: sizes});
    }

    Discount(d){
        if(d.ProductDiscount !== 0 && d.ProductDiscount){
            return(
                <div className="DiscountTag" style={{margin: "20px 30px"}}>-{d.ProductDiscount}%</div>
            )
        }else{
            return null;
        }
    }

    NewProduct(d){
        if(d.NewProduct){
            return(
                <div className="NewTag" style={{margin: "20px 30px"}}>New</div>
            )
        }else{
            return null;
        }
    }

    ProductInfo(d){
        if(d.ProductDiscount !== 0 && d.ProductDiscount){
            const NewPrice = d.ProductPrice - (d.ProductPrice * (d.ProductDiscount / 100));
            return(
                <div className="under_Img_Gallery">
                    <p className="slide_title">{d.ProductName}</p>
                    <p className="Slide_Price"><b className="old_price">${d.ProductPrice}</b>${NewPrice}</p>
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
        const {classes, pathname, childrenLink } = this.props;
        const { Colors, Size, Products } = this.props.ProductsInfo;
        const pathnameLength = (pathname.match(/\//g) || []).length;
        let paths = [];
            
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

        const BreadContent = ()=>{
            return(
                paths.map((path, i)=>{
                        if(pathnameLength-1 === i){
                            return(
                                <Typography className={classes.Panel_Link} key={i} color="textPrimary">{path}</Typography>
                            )
                        }else{
                            if(path === "home"){
                                return(
                                    <Typography className={classes.Panel_Link} key={i} color="inherit" component={Link} to={`/home`}>{path}</Typography>
                                   )
                            }else{
                                return(
                                    <Typography className={classes.Panel_Link} key={i} color="inherit" component={Link} to={`/home/${path}`}>{path}</Typography>
                                   )
                            }
                           
                        }  
                 })
            )
        };

        const ColorsPicker = ()=>{
            if(empty(Colors)){
                return <div></div>;
            }else{
            return(
            <FormGroup row={false}>
                { Colors.map((color, i)=>{
                        return(
                            <div key={i}>
                            <FormControlLabel
                            style={{textTransform: "capitalize"}}
                            control={
                                <Checkbox
                                    color="default" 
                                    checked={!!this.state.colors[color.name]} 
                                    onChange={this.handleColorChange(color.name)}
                                    value={color} 
                                />
                            }
                            label={color.name}
                          />
                          <span>({color.count})</span>
                          </div>
                        )
                    })}
            </FormGroup>
            )
            }
        }

        const SizePicker = ()=>{
            if(empty(Size)){
                return <div></div>;
            }else{
            return(
            <FormGroup row={false}>
                { Size.map((s, i)=>{
                        return(
                            <div  key={i}>
                            <FormControlLabel
                            style={{textTransform: "capitalize"}}
                            control={
                              <Checkbox
                                color="default" 
                                checked={!!this.state.size[s.name]} 
                                onChange={this.handleSizeChange(s.name)}
                                value={s} 
                                />
                            }
                            label={s.name}
                          />
                          <span>({s.count})</span>
                          </div>
                        )
                    })}
            </FormGroup>
            )
            }
        }

        const defaultRefine = ()=>{
                if(this.state.Filters.length === 0){
                    return(
                        <p>No filters applied</p>
                    )
                }else{
                    return <p></p>;
                }
        }

        const RenderProduts = ()=>{
            if(empty(Products)){
                return(
                    <p>No Products are Added yet !</p>
                )
            }else{
                return(
                    Products.map((d, i)=>{
                       return(
                        <div key={i} className="ProductCard">
                            <div className="ProductOnHoverBG"></div>
                            <div className="ProductOnHoverInfo">
                                <Visibility className="VisibilityProduct" onClick={this.handleDialogOpen(d)}/>
                            </div>
                            {this.NewProduct(d)}
                            {this.Discount(d)}
                            <img className="ProductImg" alt="" src={d.ProductFrontImage.url}/>
                            {this.ProductInfo(d)}
                        </div>
                       )
                    })
                    
                );
            }
        }

        const RenderSubLink = () =>{
            if(empty(childrenLink)){
                return <div></div>;
            }else{
                return(
                    <div className={classes.SubLinks}>
                        {childrenLink.map((childLink, i)=>{
                            return(
                                <Typography key={i} className={classes.Panel_Link} color="inherit" component={Link} to={`${pathname}/${childLink}`}>{childLink}</Typography>
                            )
                        })}
                    </div>
                )
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
                            {RenderSubLink()}
                        </div>
                        <div className={classes.FilterSubLink}>
                            <h3 className={classes.PanelTitle}>refine by</h3>
                            <div className={classes.ChipContainer}>
                                {defaultRefine()}
                                {this.state.Filters.map((filter, i)=>(
                                    <Chip
                                        key={i}
                                        style={{textTransform: "capitalize"}}
                                        label={filter.value}
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

        const Title = ()=>{
            return(
                paths.map((path, i)=>{
                        if(pathnameLength-1 === i){
                            return(
                                <Typography style={{fontSize: 30}} className={classes.Panel_Link} key={i} color="textPrimary">{path}</Typography>
                            )
                        }else{
                            if(path === "home"){
                                return(
                                    <Typography style={{fontSize: 30}} className={classes.Panel_Link} key={i} color="inherit" component={Link} to={`/home`}>{path}</Typography>
                                   )
                            }else{
                                return(
                                    <Typography style={{fontSize: 30}} className={classes.Panel_Link} key={i} color="inherit" component={Link} to={`/home/${path}`}>{path}</Typography>
                                   )
                            }
                           
                        }  
                 })
            )
        };

        return (
            <div className="page_container">
                <div className="page_title">
                    <Breadcrumbs style={{fontSize: 30}} aria-label="PathTitle" className="PathTitle">
                        {Title()}
                    </Breadcrumbs>
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
    AddToCart: PropTypes.func.isRequired,
    GetProducts: PropTypes.func.isRequired,
    ProductsInfo: PropTypes.object.isRequired,
    GetSize: PropTypes.func.isRequired,
    GetColor: PropTypes.func.isRequired,
    ResetPageProducts: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=> ({
    ProductsInfo: state.ProductsInfo
})

export default connect(mapStateToProps, {AddToCart, GetProducts, GetSize, GetColor, ResetPageProducts})(withStyles(styles)(Page));