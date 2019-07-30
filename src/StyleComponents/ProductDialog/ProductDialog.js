import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PropTypes from 'prop-types';
import {empty} from '../../is-empty'
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { AddToCart } from '../../action/authentication'

const styles = theme => ({
    DialogContent:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    BPPLabel:{
        fontSize: 22,
        letterSpacing: 1
    },
    BPPOldPrice:{
        "-webkit-text-decoration-line": "line-through",
        textDecorationLine: "line-through",
        marginRight: 10
    },
    BPPPriceVal:{
        fontSize: 20,
        color: "#525252",
        margin: "10px 0",
        textTransform: "capitalize"
    },
    BigProduct:{
        display: "flex",
        width: "40vh",
        minWidth: 280,
        height: "60vh",
        minHeight: 400,
        overflow: "hidden"
    },
    BigProductImg:{
        width: "100%",
        height: "100%",
    },
    BigProductInfo:{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: 20,
        minWidth: 400,
        [theme.breakpoints.down('sm')]: {
            minWidth: 280,
        },
        [theme.breakpoints.down('xs')]: {
            padding: "20px 0"
        },
    },
    ProductDivider:{
        margin: "20px 0 !important"
    },
    BigProductForm:{
        display: "flex",
        flexDirection: "column"
    },
    BigProductBtn:{
        margin: "10px auto 10px 0 !important",
        width: "50%",
        minWidth: 150,
    },
    QuantityInput:{
        margin: "10px auto 10px 0 !important",
        width: "50%",
        minWidth: 150,
    },
    colorsInput:{
        margin: "10px auto 10px 0 !important",
        width: "50%",
        minWidth: 150,
    },
    SizeInput:{
        margin: "10px auto 10px 0 !important",
        width: "50%",
        minWidth: 150,
    },
    description:{
        display: "flex",
        flexDirection: "column",
        margin: "30px auto 10px 0",
    },
    DescLabel:{
        fontSize: 22,
        letterSpacing: 1,
        textTransform: "capitalize"
    },
    DescVal:{
        fontSize: 16,
        color: "#525252",
        margin: "10px 0",
        textTransform: "capitalize"
    }

})

class ProductDialog extends Component {
    constructor(){
        super();
        this.state={
            Quantity: "",
            Color: "",
            Size: "",
        }
    }


    handleChange = name => event => {
        if(empty(event.target.value)){
           
        }else{
            this.setState({[name]: event.target.value });
        }
    }

    handleSubmit = (product) => (event) =>{
        event.preventDefault();
        const {Quantity, Color, Size} = this.state;
        product.ChoosedColor = Color;
        product.ChoosedSize = Size;
        product.ChoosedQuantity = Quantity;
        product.PriceTotal = product.ProductPrice * Quantity;
        this.props.AddToCart(product);

        this.setState({Color: "", Quantity: "", Size: ""})
    }

    DialogClose = () =>{
        this.props.handleDialogClose();
        this.setState({Color: "", Quantity: "", Size: ""})
    }

    render() {
        const{fullScreen, open, product, classes} = this.props;

        const RenderDescription = (p) =>{
            if(empty(p.ProductDescription)){
                return null;
            }else{
                return(
                    <div className={classes.description}>
                        <label className={classes.DescLabel} >
                            description
                        </label>
                        <p className={classes.DescVal}>{p.ProductDescription}</p>
                    </div>
                )
            }
        }

        const RednerSizePicker = (p) =>{
            if(empty(p.ProductSize)){
                return null;
            }else{
                return(
                <FormControl required className={classes.SizeInput}>
                <InputLabel htmlFor="Size-native-simple">Size</InputLabel>
                    <Select
                        native
                        value={this.state.Size}
                        onChange={this.handleChange('Size')}
                        inputProps={{
                            name: 'Size',
                            id: 'Size-native-simple'
                        }}
                    >   
                        <option value=""></option>
                        {p.ProductSize.map((s, i)=>{
                            return(
                                <option style={{textTransform: "uppercase"}} key={i} value={s}>{s}</option>
                            )
                        })}
                    </Select>
                </FormControl>
                )
            }
        }

        const RenderColorPicker = (p) =>{
            if(empty(p.ProductColors)){
                return null;
            }else{
                return(
                    <FormControl required className={classes.colorsInput}>
                    <InputLabel htmlFor="Color-native-simple">Colors</InputLabel>
                        <Select
                            native
                            value={this.state.Color}
                            onChange={this.handleChange('Color')}
                            inputProps={{
                                name: 'Color',
                                id: 'Color-native-simple'
                            }}
                        >   
                            <option value=""></option>
                            {p.ProductColors.map((color, i)=>{
                                return(
                                    <option style={{textTransform: "capitalize"}} key={i} value={color}>{color}</option>
                                )
                            })}
                        </Select>
                    </FormControl>  
                );
            }
        }

        const ProductPrice = (d)=>{
            if(d.ProductDiscount !== 0 && d.ProductDiscount){
                const NewPrice = d.ProductPrice - (d.ProductPrice * (d.ProductDiscount / 100));
                return(
                    <div>
                        <label className={classes.BPPLabel}>Price:</label>
                        <p className={classes.BPPPriceVal}><b className={classes.BPPOldPrice}>${d.ProductPrice}</b>${NewPrice}</p>
                    </div>
                )
            }else{
                return(
                    <div>
                        <label className={classes.BPPLabel}>Price:</label>
                        <p className={classes.BPPPriceVal}>${d.ProductPrice}</p>
                    </div>
                )
            }   
        }

        const RenderDialog = () =>{
            if(!empty(product)){
                return(
                    <Dialog
                        fullScreen={fullScreen}
                        maxWidth="lg"
                        open={open}
                        onClose={this.DialogClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">{product.ProductName}</DialogTitle>
                    <DialogContent className={classes.DialogContent}>
                     <div className={classes.BigProduct}><img className={classes.BigProductImg} alt="" src={product.ProductFrontImage.url} /></div>
                        <div className={classes.BigProductInfo}>
                            {ProductPrice(product)}
                            <Divider className={classes.ProductDivider}/>
                            <form onSubmit={this.handleSubmit(product)} className={classes.BigProductForm}>
                                {RenderColorPicker(product)}
                                {RednerSizePicker(product)}
                                <NumberFormat
                                    required
                                    className={classes.QuantityInput}
                                    customInput={TextField}
                                    label="Quantity"
                                    value={this.state.Quantity}
                                    onChange={this.handleChange("Quantity")}
                                    margin="normal"
                                    allowNegative={false}
                                    allowEmptyFormatting={false}
                                />
                                <Button type="submit" className={classes.BigProductBtn} variant="contained" color="primary">add to cart</Button>
                            </form>
                            <Divider className={classes.ProductDivider}/>
                            {RenderDescription(product)}
                        </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.DialogClose} color="primary" autoFocus>
                        Go Back
                    </Button>
                    </DialogActions>
                    </Dialog>
                )
            }else{
                return null;
            }
        }

        return (
            <div>
                {RenderDialog()}
            </div>
        )
    }
}

ProductDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    AddToCart: PropTypes.func.isRequired,
};

const mapStateTopProps = (state) => ({
    user: state.user
})

export default connect(mapStateTopProps, {AddToCart})(withStyles(styles)(withMobileDialog()(ProductDialog)));
