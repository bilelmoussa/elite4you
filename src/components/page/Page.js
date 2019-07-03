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
import { AddToCart } from '../../action/authentication';

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

    handleColorChange  = (name) => event =>{
        this.setState({...this.state, colors: { ...this.state.colors, [name]: event.target.checked}});
        const {Filters} = this.state;
        let Filter_value = {value: name, categorie: "color"}
        const FilterDelete = Filters.map((e)=>{return e.value}).indexOf(Filter_value.value);

        if(FilterDelete === -1){
            this.AddFilter(Filter_value);
        }else{
            Filters.splice(FilterDelete, 1);
        }
    }

    handleSizeChange  = (name) => event =>{
        this.setState({...this.state, size:{...this.state.size,[name]: event.target.checked}});
        const {Filters} = this.state;
        let Filter_value = {value: name, categorie: "size"}
        const FilterDelete = Filters.map((e)=>{return e.value}).indexOf(Filter_value.value);
        if(FilterDelete === -1){
            this.AddFilter(Filter_value);
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
        const value = {value:`${MinPrice}-${MaxPrice}`, categorie: 'price'};
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
        if(filter.categorie === "color"){
            this.setState({Filters: Filters, colors:{[filter.value]: false}, MinPrice: "", MaxPrice: ""})
        }else if(filter.categorie === "size"){
            this.setState({Filters: Filters, size:{[filter.value]: false}, MinPrice: "", MaxPrice: ""})
        }else{
            this.setState({Filters: Filters, MinPrice: "", MaxPrice: ""})
        }
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
        const {classes, pathname, colors, size, childrenLink } = this.props;
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
            if(empty(colors)){
                return <div></div>;
            }else{
            return(
            <FormGroup row={false}>
                { colors.map((color, i)=>{
                        return(
                            <FormControlLabel
                            key={i}
                            control={
                                <Checkbox
                                    color="default" 
                                    checked={!!this.state.colors[color]} 
                                    onChange={this.handleColorChange(color)}
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
        }

        const SizePicker = ()=>{
            if(empty(size)){
                return <div></div>;
            }else{
            return(
            <FormGroup row={false}>
                { size.map((s, i)=>{
                        return(
                            <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                color="default" 
                                checked={!!this.state.size[s]} 
                                onChange={this.handleSizeChange(s)}
                                value={s} 
                                />
                            }
                            label={s}
                          />
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
            if(empty(this.props.Products)){
                return(
                    <p>No Products are Added yet !</p>
                )
            }else{
                return(
                    this.props.Products.map((d, i)=>{
                       return(
                        <div key={i} className="ProductCard">
                            <div className="ProductOnHoverBG"></div>
                            <div className="ProductOnHoverInfo">
                                <Visibility className="VisibilityProduct" onClick={this.handleDialogOpen(d)}/>
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
    AddToCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=> ({
    user: state.user
})

export default connect(mapStateToProps, {AddToCart})(withStyles(styles)(Page));