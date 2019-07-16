import React, { Component } from 'react'
import { connect } from 'react-redux';
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {empty} from '../../is-empty';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
import Input from "@material-ui/core/Input";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { ChangeProducts, getGeoInfo, ChangeClientCountry } from '../../action/authentication';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import { RegionDropdown } from 'react-country-region-selector';


const CustomInput = withStyles(theme => ({
    input: {
        textAlign: "center",
        border: "1px solid #ccc"
    }
}))(Input);

const ZipInput = withStyles(theme => ({
    input: {
        border: "1px solid #ccc",
        paddingRight: 7,
        paddingLeft: 7
    }
}))(Input);



const styles = theme =>({
    CartContainer:{
        display: "flex",
        padding: "20px 20px 20px 10px",
        flexDirection: "column",
        [theme.breakpoints.down('sm')]: {
            padding: "20px 5px",
        }
    },
    CartContainerTit:{
        display: "flex",
        width: "100%",
        justifyContent: "center"
    },
    CartTitle:{
        textAlign: "center",
        textTransform: "uppercase",
        color: "#333",
        letterSpacing: 3,
        marginTop: 20,
        marginBottom: 20,
        paddingBottom: 10,
        borderBottom: '2px solid #ec6d6d'
    },
    Main:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        overflow: "hidden",
        width: "100%",
        maxWidth: 1800,
        margin: "0 auto",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        }
    },
    TableContainer:{
        width: "75%",
        maxWidth: 850,
        minWidth: 300,
        marginBottom: 10,
        marginTop: 40,
        overflow: "hidden",
        padding: 5,
        [theme.breakpoints.down('sm')]:{
           display: "none"
        }
    },
    facture:{
        width: "25%",
        minWidth: 280,
        maxWidth: 600,
        marginBottom: 40,
        marginTop: 40,
        padding: "10px",
        [theme.breakpoints.down('sm')]:{
            width: "100%",
            margin: "10px auto 40px auto"
        }
    },
    PaperFac:{
        width: "100%",
    },
    FacContainer:{
        display: "flex",
        flexDirection: "column"
    },
    FormControll:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "12px 10px",
        margin: "10px 0 0 0",
        borderBottom: "1px solid #ccc"
    },
    FacLabel:{
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    paper:{
        width: "100%",
        overflowX: 'auto',
    },
    table:{
        minWidth: 780,
    },
    TBCellInfo:{
        display: "flex",
        flexDirection: "row",
    },
    ItemInfos:{
        display: "flex",
        flexDirection: "column",
        margin: "0 20px"
    },
    itemInf:{
        display: "flex",
        flexDirection: "row",
        margin: "5px 0"
    },
    logo:{
        margin: "10px auto"
    },
    itemDesc:{
        margin: "0 10px"
    },
    CellTitle:{
        fontSize: 16,
        textTransform: "uppercase"
    },
    RowTitle:{
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    QuantityInput:{
        width: 60
    },
    fab:{
        margin: theme.spacing(1),
        width: 45,
        height: 45
    },
    SubmitBtn:{
        display: "flex",
        padding: "10px",
        margin: "15px 0"
    },
    BtnSelf:{
        margin: "0 auto !important"
    },
    Expansion_Panel:{
        margin: "0 !important",
        boxShadow: "none !important", 
        borderBottom: "1px solid #ccc"
    },
    ExPanelSummary:{
        padding: "4px 10px",
    },
    TypographyNoProd:{
        textTransform: "capitalize",
        fontSize: 14,
        letterSpacing: 1,
        color: "#f54a4a"
    },
    NumberInput:{
        display: "flex",
        flexDirection: "row"
    },
    svgIconNmbInput:{
        margin: "auto 10px",
        cursor: "pointer"
    },
    ShippingForm:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "10px 0",
        position: "relative"
    },
    ShippingLabel:{
        margin: "10px 0",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    MenuFlag:{
        border: "1px solid #222"
    },
    ExpansionPanelDetails:{
        flexDirection: "column"
    },
    ZipCodeInput:{
        width: "100%"
    },
    RegionSelect:{
        padding: "10px 5px"
    }, 
    Address:{
        border: "1px solid #ccc",
        padding: "10px 7px"
    },
    invisInput:{
        position: "absolute",
        top: "60%",
        opacity: 0,
    },
    MobileTable:{
        display: "none",
        width: "100%",
        minWidth: 300,
        minHeight: 200,
        maxWidth: 600,
        margin: "0 auto",
        padding: 5,
        [theme.breakpoints.down('sm')]:{
            display: "flex"
        }
    },
    MobilePaper:{
        width: '100%',
        height: '100%',
        minHeight: 200,
        maxHeight: 800,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
    },
    MbEmptyTitle:{
        margin: "auto",
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#f00"
    },
    MbFormControl:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "12px 10px",
        margin: "10px 0 0 0",
        borderBottom: "1px solid #ccc"
    }


})

const countItems = (Products)=>{
    let Sum = 0;
    let ItemsQuantity = Products.map((product)=>{
        let reVal = parseInt(product.ProductQuantity, 10) || 0;
        return(reVal)
    })
    ItemsQuantity.forEach((q, i)=>{
        Sum += q;
    });
    return Sum;
}

const countSubTot = (Products) =>{
    let AllItemsPrice = Products.map((product)=>{
        return(parseInt(product.PriceTotal, 10))
    })

    let SubTotal = 0;
    AllItemsPrice.forEach((q, i)=>{
        SubTotal += q
    })

    return(SubTotal);
}

const CountTax = (q, tax) =>{
    let itemsTax = q * tax || 0;
    return(itemsTax)
}

const Total = (SubTotal,  TaxTot) =>{
    let Total = SubTotal + TaxTot || 0;
    return Total;
}



class Cart extends Component {
    constructor(){
        super();
        this.state = {
            Products: [],
            countryName: '',
            countryCode: '',
            country: '',
            region: '',
            ZipPostCode: '' ,
            Address: '',
            ItemsQuantity: 0,
            SubTotal: 0,
            TotalTax: 0,
            TotalPrice: 0,
        }
    }

    componentDidMount(){
        this.props.getGeoInfo();
        const localStorageCartItem = localStorage.getItem('CardItems');
        const ProductsItem = JSON.parse(localStorageCartItem);
        if(empty(ProductsItem)){
            return null;
        }else{
            let TotalItems = countItems(ProductsItem);
            let SubTotal = countSubTot(ProductsItem);
            let TotalTax = CountTax(TotalItems, this.props.Tax);
            let TotalPrice = Total(SubTotal, TotalTax)
            ProductsItem.forEach((item, i)=>{
                item.ClientId = i;
                this.setState(prevState => ({Products: [ ...prevState.Products, item ]}));
            })
            this.setState({ItemsQuantity: TotalItems, SubTotal: SubTotal, TotalTax: TotalTax, TotalPrice: TotalPrice});
        }
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            if(empty(nextProps.cart.CartItems) && empty(nextProps.GeoInfo.data)){
                return null;
            }
            else if(!empty(nextProps.cart.CartItems) && empty(nextProps.GeoInfo.data)){
                return{Products: nextProps.cart.CartItems} 
            }
            else if(empty(nextProps.cart.CartItems) && !empty(nextProps.GeoInfo.data)){
                return{
                    country: nextProps.GeoInfo.data.country
                } 
            }
            else{
                return{
                    Products: nextProps.cart.CartItems,
                    country: nextProps.GeoInfo.data.country
                }    
            }
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(empty(this.props.cart.CartItems) && empty(this.props.GeoInfo.data)){
                return null;
            }else if(!empty(this.props.cart.CartItems) && empty(this.props.GeoInfo.data)){
                let TotalItems = countItems(this.props.cart.CartItems);
                let SubTotal = countSubTot(this.props.cart.CartItems);
                let TotalTax = CountTax(TotalItems, this.props.Tax);
                let TotalPrice = Total(SubTotal, TotalTax);
                this.setState({Products: this.props.cart.CartItems, ItemsQuantity: TotalItems, SubTotal: SubTotal, TotalTax: TotalTax, TotalPrice: TotalPrice});
            }else if(empty(this.props.cart.CartItems) && !empty(this.props.GeoInfo.data)){
                if(!empty(prevState.Products)){
                    this.refs.userFlag.updateSelected(this.props.GeoInfo.data.country)
                }
                this.setState({
                    country: this.props.GeoInfo.data.country
                })
            }
            else{
                this.refs.userFlag.updateSelected(this.props.GeoInfo.data.country);
                let TotalItems = countItems(this.props.cart.CartItems);
                let SubTotal = countSubTot(this.props.cart.CartItems);
                let TotalTax = CountTax(TotalItems, this.props.Tax);
                let TotalPrice = Total(SubTotal, TotalTax);

                this.setState({
                   Products: this.props.cart.CartItems,
                   country: this.props.GeoInfo.data.country,
                   ItemsQuantity: TotalItems, 
                   SubTotal: SubTotal, 
                   TotalTax: TotalTax, 
                   TotalPrice: TotalPrice,
                });
            }
        }else{
            return null;
        }
    }
    
    handleChange = (item) => event => {
        const {Products} = this.state;
        if(empty(event.target.value)){
            Products[item.ClientId].ProductQuantity = 1
            Products[item.ClientId].PriceTotal = item.ProductPrice * 1;
            this.setState({Products: Products});
        }else{
            Products[item.ClientId].ProductQuantity = event.target.value;
            Products[item.ClientId].PriceTotal = item.ProductPrice * event.target.value;;
            this.setState({Products: Products});
            this.props.ChangeProducts(Products);
        }
    }

    handleDelete = (item) => event => {
        const {Products} = this.state;
        const itemToDelete = Products.map((row)=>{return row.ClientId}).indexOf(item.ClientId);
        Products.splice(itemToDelete, 1);
        this.setState({Products: Products});
        this.props.ChangeProducts(Products);
    }

    handeleCheckoutSubmit = event =>{
        event.preventDefault();
        const {ItemsQuantity, SubTotal, TotalTax, TotalPrice, country, region, ZipPostCode, Address} = this.state;
        const checkout= {
            Quantity: ItemsQuantity,
             SubTotal: SubTotal,
             TotalTax: TotalTax,
             TotalPrice: TotalPrice,
             country: country,
             region: region,
             ZipPostCode: ZipPostCode,
             Address: Address
        }
        console.log(checkout);
    }

    handeleAddQuantity = (item) => event =>{
        const {Products} = this.state;
        Products[item.ClientId].ProductQuantity ++;
        Products[item.ClientId].PriceTotal = item.ProductPrice * Products[item.ClientId].ProductQuantity
        this.setState({Products: Products});
        this.props.ChangeProducts(Products);
    }

    handeleRemoveQuantity = (item) => event =>{
        const {Products} = this.state;
        if(Products[item.ClientId].ProductQuantity <= 1){

        }else{
            Products[item.ClientId].ProductQuantity --;
            Products[item.ClientId].PriceTotal = item.ProductPrice * Products[item.ClientId].ProductQuantity
            this.setState({Products: Products});
            this.props.ChangeProducts(Products);
        }

    }

    onSelectFlag = (countryCode) =>{
        this.setState({country: countryCode});
        this.props.ChangeClientCountry(countryCode);
    }

    selectRegion (val) {
        this.setState({ region: val });
    }

    handleChangeZipPostCode = (event) =>{
        this.setState({ZipPostCode: event.target.value})
    }

    handleChangeAddress= (event) =>{
        this.setState({Address: event.target.value})
    }

    render() {
        const { classes } = this.props;
        const { Products, region, country, ZipPostCode, Address, TotalTax, ItemsQuantity, SubTotal, TotalPrice } = this.state;
        

        const ProductName = (item) =>{
            if(empty(item.ProductName)){
                return null;
            }else{
                return(
                    <p className={classes.RowTitle}>{item.ProductName}</p>
                )
            }
        }
        
        const ProductColor = (item) =>{
            if(empty(item.ProductColor)){
                return null;
            }else{
                return(
                    <p className={classes.itemDesc}>{item.ProductColor}</p>
                );
            }
        }

        const ProductSize = (item) =>{
            if(empty(item.ProductSize)){
                return null;
            }else{
                return(
                    <p className={classes.itemDesc}>{item.ProductSize}</p>
                )
            }
        }

        const ProductPrice = (item) =>{
            if(empty(item.ProductPrice)){
                return null;
            }else{
                return(
                   `$${item.ProductPrice}`
                )
            }
        }

        const ProductQuantity = (item) =>{
            if(empty(item.ProductQuantity)){
                return null;
            }else{
                return(
                    <div className={classes.NumberInput}>
                        <Remove onClick={this.handeleRemoveQuantity(item)} className={classes.svgIconNmbInput}/>
                        <NumberFormat
                            required
                            className={classes.QuantityInput}
                            customInput={CustomInput}
                            value={item.ProductQuantity}
                            onChange={this.handleChange(item)}
                            allowNegative={false}
                        />
                        <Add onClick={this.handeleAddQuantity(item)} className={classes.svgIconNmbInput}/>
                    </div>
                )
            }
        }

       const ProductTotal = (item) =>{
            if(!empty(item.ProductQuantity) && !empty(item.ProductPrice)){
                return `$${item.ProductQuantity * item.ProductPrice}`
            }else{
                return null;
            }
        }


        const RenderProducts = () =>{
            if(empty(Products)){
                return(
                    <TableRow>
                        <TableCell align="right">EMPTY CART !</TableCell>
                    </TableRow>
                );
            }else{
                return(
                    Products.map((item, i)=>{
                        return(
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                <div className={classes.TBCellInfo}>
                                    <div className={classes.imgLogo}>
                                    <img alt="" width={60} height={"auto"} className={classes.logo} src={require(`../../static/${item.ProductImage}`)} />
                                    </div>
                                    <div className={classes.ItemInfos}>
                                        <div className={classes.itemInf} >
                                            {ProductName(item)}
                                        </div>
                                        <div className={classes.itemInf} >
                                            <label>Color :</label> 
                                            {ProductColor(item)}
                                        </div>
                                        <div className={classes.itemInf} >
                                            <label>Size :</label>
                                            {ProductSize(item)}
                                        </div>
                                    </div>
                                </div>

                            </TableCell>
                            <TableCell component="th" scope="row">{ProductPrice(item)}</TableCell>
                            <TableCell component="th" scope="row">{ProductQuantity(item)}</TableCell>
                            <TableCell component="th" scope="row">{ProductTotal(item)}</TableCell>
                            <TableCell component="th" scope="row">
                                <Fab color="secondary" aria-label="Delete" className={classes.fab} onClick={this.handleDelete(item)} >
                                    <DeleteIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                        )
                    })
                )
            }
        }

        const disableBtn = () =>{
            if(empty(ItemsQuantity) || empty(SubTotal) || empty(TotalTax) || empty(TotalPrice) || empty(country) || empty(region) || empty(ZipPostCode) || empty(Address) ){
                return(
                    <Button 
                    disabled
                    type="submit" 
                    variant="contained"
                    color="primary"
                    className={classes.BtnSelf}
                >
                    Proceed to checkout
                </Button>
                )
            }else{
                return(
                <Button 
                    type="submit" 
                    variant="contained"
                    color="primary"
                    className={classes.BtnSelf}
                >
                    Proceed to checkout
                </Button>
                )
            }
        }
        
        const Facture = (items) =>{
            if(empty(items)){
                return(
                    <Paper className={classes.PaperFac} onSubmit={this.handleSubmitCheckout} >
                        <div className={classes.FacContainer}>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Total Items :</label>
                                <p className={classes.Facval}>0</p>
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>SubTotal :</label>
                                <p className={classes.Facval}>$0</p>
                            </div>
                            <ExpansionPanel className={classes.Expansion_Panel} >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    classes={{root: classes.ExPanelSummary}}
                                >
                                <label className={classes.FacLabel}>Shipping :</label>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography className={classes.TypographyNoProd}>
                                     you have No Products Added To Your cart Please Add One And than you can view Shipping menu ! 
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Tax :</label>
                                <p className={classes.Facval}>$0</p>
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Grand Total :</label>
                                <p className={classes.Facval}>$0</p>
                            </div>
                            <div className={classes.SubmitBtn}>
                            <Button
                                disabled 
                                type="submit" 
                                variant="contained"
                                color="primary"
                                className={classes.BtnSelf}
                            >
                                Proceed to checkout
                            </Button>
                            </div>
                        </div>
                    </Paper>
                )
            }else{
                return(
                    <Paper className={classes.PaperFac} >
                        <div className={classes.FacContainer}>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Total Items :</label>
                                <p className={classes.Facval}>{ItemsQuantity}</p>
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>SubTotal :</label>
                                <p className={classes.Facval}>${SubTotal}</p>
                            </div>
                            <ExpansionPanel className={classes.Expansion_Panel} defaultExpanded>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    classes={{root: classes.ExPanelSummary}}
                                >
                                <label className={classes.FacLabel}>Shipping :</label>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                                    <div className={classes.ShippingForm}>
                                        <label className={classes.ShippingLabel}>country :</label>
                                        <ReactFlagsSelect
                                            ref="userFlag"
                                            className={classes.MenuFlag}
                                            defaultCountry={country}
                                            searchable={true}
                                            searchPlaceholder="Search for a country" 
                                            onSelect={this.onSelectFlag}
                                        />
                                        <Input 
                                            required
                                            value={country}
                                            className={classes.invisInput}
                                        />
                                    </div>
                                    <div className={classes.ShippingForm}>
                                        <label className={classes.ShippingLabel}>Region :</label>
                                        <RegionDropdown
                                            className={classes.RegionSelect}
                                            disableWhenEmpty={true}
                                            country={country}
                                            countryValueType="short"
                                            value={region}
                                            onChange={(val) => this.selectRegion(val)} 
                                        />
                                        <Input 
                                            required
                                            value={region}
                                            className={classes.invisInput}
                                        />
                                    </div>
                                    <div className={classes.ShippingForm}>
                                        <label className={classes.ShippingLabel}>Zip/Postcode :</label>
                                        <ZipInput
                                            required
                                            className={classes.ZipCodeInput}
                                            value={ZipPostCode}
                                            onChange={this.handleChangeZipPostCode}
                                        />
                                    </div>
                                    <div className={classes.ShippingForm}>
                                        <label className={classes.ShippingLabel}>Address:</label>
                                        <Input
                                            required
                                            multiline={true}
                                            rows={3}
                                            className={classes.Address}
                                            value={Address}
                                            onChange={this.handleChangeAddress}
                                        />
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Tax :</label>
                                <p className={classes.Facval}>${TotalTax}</p>
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Grand Total :</label>
                                <p className={classes.Facval}>${TotalPrice}</p>
                            </div>
                            <div className={classes.SubmitBtn}>
                            {disableBtn()}
                            </div>
                        </div>
                    </Paper>
                )
            }
        }


        const MobilePColor = (item) =>{
            if(empty(item.ProductColor)){
                return null;
            }else{
                return(
                    <div style={{display: "flex", flexDirection: 'row', marginTop: 8, justifyContent:"center"}}>
                    <label style={{textTransform: "capitalize", fontWeight: "bold", marginRight: 5}}>color :</label>
                    <p>{item.ProductColor}</p>
                    </div>
                )
            }
        }

        const MobilePSize= (item) =>{
            if(empty(item.ProductSize)){
                return null;
            }else{
                return(
                    <div style={{display: "flex", flexDirection: 'row', marginTop: 8, justifyContent:"center"}}>
                    <label style={{textTransform: "capitalize", fontWeight: "bold", marginRight: 5}}>size :</label>
                    <p>{item.ProductSize}</p>
                    </div>
                )
            }
        }


        const MobileTableProd = () =>{
            if(empty(Products)){
                return(
                    <h1 className={classes.MbEmptyTitle}>empty cart !</h1>
                )
            }else{
              return(
                Products.map((item, i)=>{
                    return(
                                <div key={i} style={{position: "relative", padding: "10px 0 0 0", display: "flex", flexDirection: "column", margin: "25px 10px", border: "1px solid #dcdcdc"}}>
                                    <div style={{width: 50, height: 25, textAlign: "center", backgroundColor: "#ff9b9b", fontSize: 18, color: "#fff", overflow: "hidden"}}>{i+1}</div>
                                    <div className={classes.MbFormControl}>
                                        
                                            <label className={classes.FacLabel} style={{marginRight: "5px", whiteSpace: 'nowrap'}}>item :</label>
                                            
                                            <div style={{display: "flex", width: "100%", flexDirection: "row", flexWrap: "wrap-reverse", justifyContent:"space-evenly"}}>
                                                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                                                    {ProductName(item)}
                                                    {MobilePColor(item)}
                                                    {MobilePSize(item)}
                                                </div>
                                                <div className={classes.imgLogo}>
                                                    <img alt="" width={60} height={"auto"} className={classes.logo} src={require(`../../static/${item.ProductImage}`)} />
                                                </div>
                                            </div>
                                    </div>
                                    <div className={classes.MbFormControl}>
                                            <label className={classes.FacLabel}>Price :</label>
                                            {ProductPrice(item)}
                                    </div>
                                    <div className={classes.MbFormControl}>
                                            <label className={classes.FacLabel}>Quantity :</label>
                                            {ProductQuantity(item)}
                                    </div>
                                    <div className={classes.MbFormControl}>
                                            <label className={classes.FacLabel}>Total :</label>
                                            {ProductTotal(item)}
                                    </div>
                                    <div className={classes.MbFormControl}>
                                            <label className={classes.FacLabel}>Action :</label>
                                            <Fab color="secondary" aria-label="Delete" className={classes.fab} onClick={this.handleDelete(item)} >
                                                <DeleteIcon />
                                            </Fab>
                                    </div>
                                </div>
                    )
                })
              )
            }
        }

        return (
            <div className={classes.CartContainer}>
                <div className={classes.CartContainerTit}><h1 className={classes.CartTitle}>Your cart</h1></div>
                <form style={{width: "100%", }} onSubmit={this.handeleCheckoutSubmit}>
                <main className={classes.Main}>
                    <div className={classes.TableContainer}>
                        <Paper className={classes.paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.CellTitle}>Item</TableCell>
                                        <TableCell className={classes.CellTitle} align="left">Price</TableCell>
                                        <TableCell className={classes.CellTitle} align="left">Quantity</TableCell>
                                        <TableCell className={classes.CellTitle} align="left">Total</TableCell>
                                        <TableCell className={classes.CellTitle} align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {RenderProducts()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <div className={classes.MobileTable}>
                        <Paper className={classes.MobilePaper}>
                            {MobileTableProd()}
                        </Paper>
                    </div>
                    <div className={classes.facture}>
                        {Facture(Products)}
                    </div>
                </main>
                </form>

            </div>
        )
    }
}

Cart.protoType = {
    classes: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    ChangeProducts: PropTypes.func.isRequired,
    GeoInfo: PropTypes.object.isRequired,
    getGeoInfo: PropTypes.func.isRequired,
    ChangeClientCountry: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    GeoInfo: state.GeoInfo
})

export default connect(mapStateToProps, {ChangeProducts, getGeoInfo, ChangeClientCountry})(withStyles(styles)(Cart));
