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
        padding: 20,
        flexDirection: "column"
    },
    CartTitle:{
        textAlign: "center",
        textTransform: "uppercase",
        color: "#333",
        letterSpacing: 3,
        marginTop: 20,
        marginBottom: 20
    },
    Main:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        overflow: "hidden"
    },
    TableContainer:{
        width: "90%",
        maxWidth: 850,
        minWidth: 280,
        marginBottom: 40,
        marginTop: 40,
        overflow: "hidden",
        padding: 5,
    },
    facture:{
        width: "10%",
        minWidth: 280,
        maxWidth: 320,
        marginBottom: 40,
        marginTop: 40,
        padding: "10px",
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
        minWidth: 650,
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
        margin: "10px 0"
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
    }


})

class Cart extends Component {
    constructor(){
        super();
        this.state = {
            Products: [],
            countryName: '',
            countryCode: '',
            country: '',
            region: '',
            ZipPostCode: '' 
        }
    }

    componentDidMount(){
        this.props.getGeoInfo();
        const localStorageCartItem = localStorage.getItem('CardItems');
        const ProductsItem = JSON.parse(localStorageCartItem);
        if(empty(ProductsItem)){
            return null;
        }else{
            ProductsItem.forEach((item, i)=>{
                item.ClientId = i;
                this.setState(prevState => ({Products: [ ...prevState.Products, item ]}));
            })
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
                this.setState({Products: this.props.cart.CartItems});
            }else if(empty(this.props.cart.CartItems) && !empty(this.props.GeoInfo.data)){
                this.refs.userFlag.updateSelected(this.props.GeoInfo.data.country)
                this.setState({
                    country: this.props.GeoInfo.data.country
                })
            }
            else{
                this.refs.userFlag.updateSelected(this.props.GeoInfo.data.country)
                this.setState({
                   Products: this.props.cart.CartItems,
                   country: this.props.GeoInfo.data.country,
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

    handleSubmitCheckout = () => event =>{
        event.preventDefault();
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

    render() {
        const { classes } = this.props;
        const { Products, region, country, ZipPostCode } = this.state;
        const taxval = 2.5;
        let AllItemsQuantity = Products.map((product)=>{
            let reVal = parseInt(product.ProductQuantity, 10) || 0;
            return(reVal)
        });

        let sum = 0;
        AllItemsQuantity.forEach((q, i)=>{
            sum += q
        })

        let itemsQuantity = sum;
        let itemsTax = itemsQuantity * taxval || 0;

        let AllItemsPrice = Products.map((product)=>{
            return(parseInt(product.PriceTotal, 10))
        })

        let SubTotal = 0;
        AllItemsPrice.forEach((q, i)=>{
            SubTotal += q
        })


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
            if(empty(item.ProductPrice) || empty(item.ProductQuantity)){
                return null;
            }else{
                return(
                    `$${item.ProductPrice * item.ProductQuantity}`
                )
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

        
        const TotlaItemsCount = () =>{
            return(
                <p className={classes.Facval}>{itemsQuantity}</p>
            )
        }

        const TotlaItemsSubTotal = () =>{
            return(<p className={classes.Facval}>${SubTotal}</p>)
        }

        const Tax = () =>{
            return(<p className={classes.Facval}>${itemsTax}</p>)
        }

        const GrandTotal = () =>{
            let val = SubTotal + itemsTax;
            return(<p className={classes.Facval}>${val}</p>)
        }
        
        const Facture = (items) =>{
            if(empty(items)){
                return(
                    <Paper className={classes.PaperFac} onSubmit={this.handleSubmitCheckout} >
                        <form className={classes.FacContainer}>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Total Items :</label>
                                <p className={classes.Facval}>0</p>
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>SubTotal :</label>
                                <p className={classes.Facval}>$0</p>
                            </div>
                            <ExpansionPanel className={classes.Expansion_Panel}>
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
                        </form>
                    </Paper>
                )
            }else{
                return(
                    <Paper className={classes.PaperFac} >
                        <form className={classes.FacContainer} onSubmit={this.handleSubmitCheckout}>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Total Items :</label>
                                {TotlaItemsCount()}
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>SubTotal :</label>
                                {TotlaItemsSubTotal()}
                            </div>
                            <ExpansionPanel className={classes.Expansion_Panel}>
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
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Tax :</label>
                                {Tax()}
                            </div>
                            <div className={classes.FormControll}>
                                <label className={classes.FacLabel}>Grand Total :</label>
                                {GrandTotal()}
                            </div>
                            <div className={classes.SubmitBtn}>
                            <Button 
                                type="submit" 
                                variant="contained"
                                color="primary"
                                className={classes.BtnSelf}
                            >
                                Proceed to checkout
                            </Button>
                            </div>
                        </form>
                    </Paper>
                )
            }
        }

        return (
            <div className={classes.CartContainer}>
                <h1 className={classes.CartTitle}>Your cart</h1>
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
                    <div className={classes.facture}>
                        {Facture(Products)}
                    </div>
                </main>
                
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
