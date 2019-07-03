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
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';
import Input from "@material-ui/core/Input";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteCartProduct } from '../../action/authentication';

const CustomInput = withStyles(theme => ({
    input: {
        textAlign: "center"
    }
}))(Input);

function CustomTextField(props){
    const { ...other } = props;

    return(
        <TextField 
            {...other}
            InputProps={{
                inputComponent: CustomInput,
            }}
        />
    )
}

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
        height: 380,
        marginBottom: 40,
        marginTop: 40,
        border: "1px solid #ccc",
        overflow: "hidden"
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


})

class Cart extends Component {
    constructor(){
        super();
        this.state = {
            Products: [],
        }
    }

    componentDidMount(){
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
            if(empty(nextProps.cart.CartItems)){
                return null;
            }else{
                return{Products: nextProps.cart.CartItems}    
            }
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(empty(this.props.cart.CartItems)){
                return null;
            }else{
               this.setState({Products: this.props.cart.CartItems});
            }
        }else{
            return null;
        }
    }
    
    handleChange = (item) => event => {
        const {Products} = this.state;
        if(empty(event.target.value)){
            this.setState({Products: Products});
        }else{
            Products[item.ClientId].ProductQuantity = event.target.value;
            this.setState({Products: Products});
        }
    }

    handleDelete = (item) => event => {
        const {Products} = this.state;
        const itemToDelete = Products.map((row)=>{return row.ClientId}).indexOf(item.ClientId);
        Products.splice(itemToDelete, 1);
        this.setState({Products: Products});
        this.props.DeleteCartProduct(Products);
    }

    render() {
        const { classes } = this.props;
        const { Products } = this.state;

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
                    <NumberFormat
                        required
                        className={classes.QuantityInput}
                        customInput={CustomTextField}
                        label="Quantity"
                        value={item.ProductQuantity}
                        onChange={this.handleChange(item)}
                        margin="normal"
                        allowNegative={false}
                    />
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

                    </div>
                </main>
                
            </div>
        )
    }
}

Cart.protoType = {
    classes: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    DeleteCartProduct: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, {DeleteCartProduct})(withStyles(styles)(Cart));
