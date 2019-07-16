import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import {empty} from '../../../../is-empty';
import Chip from '@material-ui/core/Chip';
import Upload from '../../../../StyleComponents/upload/Upload';
import { uploadFile } from '../../../../action/authentication';

const styles = theme =>({
    paper: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        padding: theme.spacing(3, 2),
        width: "80%",
        minWidth: 300,
        maxWidth: 1200,
        margin: "50px auto",
        overflow: "hidden",
        [theme.breakpoints.down('md')]: {
            width: "80% !important"
        },
        [theme.breakpoints.down('xs')]: {
            width: "90% !important"
        }
    },
    form:{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        overflow: "hidden",
    },
    textField: {
        width: "70%",
        maxWidth: 500,
        minWidth: 250,
        margin: `20px auto`,
    },
    SelectField:{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        maxWidth: 500,
        minWidth: 250,
        margin: `20px auto`,
        justifyContent: "center",
    },
    button:{
        width: "70%",
        minWidth: 250,
        maxWidth: 500,
        margin: '20px auto', 
    },
    Title:{
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 20,
        letterSpacing: 2
    },
    menu: {
        width: 200,
    },
    select_button:{
        display: "block",
        minWidth: 150,
        overflow: "hidden",
        margin: 'auto'
    },
    FormSelect:{
        width: "100%",
        margin: " 0 0 20px 0"
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

class AddProduct extends Component {
    constructor(){
        super();
        this.state = {
            ProductName: "",
            ProductDescription: "",
            ProductPrice: "",
            ProductDiscount: "",
            ProductQuantity: "",
            Color: "",
            ProductColors: [],
            files: [],
            Size: "",
            ProductSize: [],
            Categorie: "",
            ProductCategories: [],
            ChildCategorie: "",
            ProductChildCategories: []
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    }

    AddColor = () =>{
        const {Color, ProductColors} = this.state;
        if(!empty(Color) && Color != 0){
            const ExistColor = ProductColors.indexOf(Color);
            if(ExistColor === -1){
                this.setState({ProductColors: [...ProductColors, Color], Color: "0"});
            }
        } 
    }

    handleCategorieDelete = categorie => () =>{
        const {ProductCategories} = this.state;
        const chipToDelete = ProductCategories.indexOf(categorie);
        ProductCategories.splice(chipToDelete, 1);
        this.setState({ProductCategories: ProductCategories})
    }

    AddCategorie = ()  =>{
        const {Categorie, ProductCategories} = this.state;
        if(!empty(Categorie) && Categorie != 0){
            if(ProductCategories.length === 0){
                this.setState({ProductCategories: [...ProductCategories, Categorie], Categorie: "0"});
            }else{
                const chipToDelete = ProductCategories.indexOf(Categorie);
                ProductCategories.splice(chipToDelete, 1);
                this.setState({ProductCategories: [...ProductCategories, Categorie], Categorie: "0"});
            }
        } 
    }

    AddChildCategorie = () =>{
        const {ChildCategorie, ProductChildCategories} = this.state;
        if(!empty(ChildCategorie) && ChildCategorie != 0){
            if(ProductChildCategories.length === 0){
                this.setState({ProductChildCategories: [...ProductChildCategories, ChildCategorie], ChildCategorie: "0"});
            }else{
                const chipToDelete = ProductChildCategories.indexOf(ChildCategorie);
                ProductChildCategories.splice(chipToDelete, 1);
                this.setState({ProductChildCategories: [...ProductChildCategories, ChildCategorie], ChildCategorie: "0"});
            }
            
        } 
    }

    AddSize = () =>{
        const {Size, ProductSize} = this.state;
        if(!empty(Size) && Size != 0){
            const ExistSize = ProductSize.indexOf(Size);
            if(ExistSize === -1){
                this.setState({ProductSize: [...ProductSize, Size], Size: "0"});
            }
        } 
    }

    handleFileChange = (files)=>{
        this.setState({
          files: files
        });
    }
    

    handleChildCategorieDelete = childCategorie => () =>{
        const {ProductChildCategories} = this.state;
        const chipToDelete = ProductChildCategories.indexOf(childCategorie);
        ProductChildCategories.splice(chipToDelete, 1);
        this.setState({ProductChildCategories: ProductChildCategories})
    }

    handleColorDelete = color => () =>{
        const {ProductColors} = this.state;
        const chipToDelete = ProductColors.indexOf(color);
        ProductColors.splice(chipToDelete, 1);
        this.setState({ProductColors: ProductColors})
    }

    handleSizeDelete = size => () =>{
        const {ProductSize} = this.state;
        const chipToDelete = ProductSize.indexOf(size);
        ProductSize.splice(chipToDelete, 1);
        this.setState({ProductSize: ProductSize})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const {files, ProductName, ProductDescription, ProductPrice, ProductDiscount, ProductQuantity, ProductColors, ProductSize, ProductCategories, ProductChildCategories  } = this.state;
        if(empty(files) && empty(ProductName) && empty(ProductDescription) && empty(ProductPrice) && empty(ProductDiscount) && empty(ProductQuantity) && empty(ProductColors) && empty(ProductSize) && empty(ProductCategories) && empty(ProductChildCategories)){
            console.log('field are empty')
        }else{
            const Data = {
                ProductName: ProductName,
                ProductDescription: ProductDescription,
                ProductPrice: ProductPrice,
                ProductDiscount: ProductDiscount,
                ProductQuantity: ProductQuantity,
                ProductColors: ProductColors,
                ProductSize: ProductSize,
                ProductCategories: ProductCategories,
                ProductChildCategories: ProductChildCategories
            }
            this.props.uploadFile(files, Data);
        }
    }

    onFilesAdded = (files) => {
        this.setState(prevState => ({
          files: prevState.files.concat(files)
        }));
    }

    handeleDeleteFile = (target) =>{
        const {files} = this.state;
        let index = files.indexOf(target);
        if (index !== -1) {
            files.splice(index, 1);
        this.setState({files: files});
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.paper}>
                <Typography className={classes.Title} variant="h6" color="inherit">
                    Add a New Product 
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField 
                        classes={{root: classes.textField}} 
                        value={this.state.ProductName} 
                        label="Name" 
                        onChange={this.handleChange("ProductName")}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                        classes={{root: classes.textField}} 
                        value={this.state.ProductDescription} 
                        label="Description" 
                        onChange={this.handleChange("ProductDescription")}
                        margin="normal"
                        variant="filled"
                    />
                    <div className={classes.SelectField}>
                        <FormControl variant="filled" className={classes.FormSelect}>
                        <InputLabel htmlFor="filled-Categorie-native-simple">Categories</InputLabel>
                            <Select
                                native
                                value={this.state.Categorie}
                                onChange={this.handleChange('Categorie')}
                                input={<FilledInput name="Categorie" id="filled-Categorie-native-simple" />}
                            >
                                <option value="" />
                                <option value={'Women'}>Women</option>
                                <option value={'Kids'}>Kids</option>
                            </Select>
                        </FormControl>
                        <Button 
                            className={classes.select_button}  variant="contained" 
                            color="primary"
                            onClick={this.AddCategorie}
                        >
                            ADD Categorie
                        </Button>
                        <div className={classes.ChipContainer}>
                            {this.state.ProductCategories.map((Categorie, i)=>(
                                <Chip
                                    key={i}
                                    label={Categorie}
                                    className={classes.chip}
                                    onDelete={this.handleCategorieDelete(Categorie)}                  
                                />
                            ))}
                        </div>
                    </div>

                    <div className={classes.SelectField}>
                        <FormControl variant="filled" className={classes.FormSelect}>
                        <InputLabel htmlFor="filled-ChildCategorie-native-simple">Child Categories</InputLabel>
                            <Select
                                native
                                value={this.state.ChildCategorie}
                                onChange={this.handleChange('ChildCategorie')}
                                input={<FilledInput name="ChildCategorie" id="filled-Categorie-native-simple" />}
                            >
                                <option value="" />
                                <option value={'Clothing'}>Clothing</option>
                                <option value={'Shoes'}>Shoes</option>
                                <option value={'Accessories'}>Accessories</option>
                            </Select>
                        </FormControl>
                        <Button 
                            className={classes.select_button}  variant="contained" 
                            color="primary"
                            onClick={this.AddChildCategorie}
                        >
                            ADD Child Categorie
                        </Button>
                        <div className={classes.ChipContainer}>
                            {this.state.ProductChildCategories.map((ChildCategorie, i)=>(
                                <Chip
                                    key={i}
                                    label={ChildCategorie}
                                    className={classes.chip}
                                    onDelete={this.handleChildCategorieDelete(ChildCategorie)}                  
                                />
                            ))}
                        </div>
                    </div>

                    <NumberFormat
                        classes={{root: classes.textField}} 
                        customInput={TextField}
                        label="Price"
                        value={this.state.ProductPrice}
                        onChange={this.handleChange("ProductPrice")}
                        margin="normal"
                        variant="filled"
                        allowNegative={false}
                    />
                    <NumberFormat
                        classes={{root: classes.textField}} 
                        customInput={TextField}
                        label="Discount"
                        value={this.state.ProductDiscount}
                        onChange={this.handleChange("ProductDiscount")}
                        margin="normal"
                        variant="filled"
                        suffix={'%'}
                        allowNegative={false}
                    />
                    <NumberFormat
                        classes={{root: classes.textField}} 
                        customInput={TextField}
                        label="Quantity"
                        value={this.state.ProductQuantity}
                        onChange={this.handleChange("ProductQuantity")}
                        margin="normal"
                        variant="filled"
                        allowNegative={false}
                    />

                    <div className={classes.SelectField}>
                        <FormControl variant="filled" className={classes.FormSelect}>
                        <InputLabel htmlFor="filled-Color-native-simple">Colors</InputLabel>
                            <Select
                                native
                                value={this.state.Color}
                                onChange={this.handleChange('Color')}
                                input={<FilledInput name="Color" id="filled-Color-native-simple" />}
                            >
                                <option value="" />
                                <option value={'White'}>White</option>
                                <option value={'Yellow'}>Yellow</option>
                                <option value={'Orange'}>Orange</option>
                                <option value={'Red'}>Red</option>
                                <option value={'Pink'}>Pink</option>
                                <option value={'Purple'}>Purple</option>
                                <option value={"Blue"}>Blue</option>
                                <option value={"Green"}>Green</option>
                                <option value={'Grey'}>Brown</option>         
                                <option value={'Black'}>Black</option>
                            </Select>
                        </FormControl>
                        <Button 
                            className={classes.select_button}  variant="contained" 
                            color="primary"
                            onClick={this.AddColor}
                        >
                            ADD color
                        </Button>
                        <div className={classes.ChipContainer}>
                            {this.state.ProductColors.map((color, i)=>(
                                <Chip
                                    key={i}
                                    label={color}
                                    className={classes.chip}
                                    onDelete={this.handleColorDelete(color)}                  
                                />
                            ))}
                        </div>
                    </div>

                    <div className={classes.SelectField}>
                        <FormControl variant="filled" className={classes.FormSelect}>
                        <InputLabel htmlFor="filled-Size-native-simple">Size</InputLabel>
                            <Select
                                native
                                value={this.state.Size}
                                onChange={this.handleChange('Size')}
                                input={<FilledInput name="Size" id="filled-Size-native-simple" />}
                            >
                                <option value="" />
                                <option value={'M'}>M</option>
                                <option value={'L'}>L</option>
                                <option value={'XL'}>XL</option>
                                <option value={'S'}>S</option>
                                <option value={'XXL'}>XXL</option>
                            </Select>
                        </FormControl>
                        <Button 
                            className={classes.select_button}  variant="contained" 
                            color="primary"
                            onClick={this.AddSize}
                        >
                            ADD Size
                        </Button>
                        <div className={classes.ChipContainer}>
                            {this.state.ProductSize.map((S, i)=>(
                                <Chip
                                    key={i}
                                    label={S}
                                    className={classes.chip}
                                    onDelete={this.handleSizeDelete(S)}                  
                                />
                            ))}
                        </div>
                    </div>

                    <Upload  onFilesAdded={this.onFilesAdded} handeleDeleteFile={this.handeleDeleteFile} />

                    <Button 
                        className={classes.button}  variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        ADD
                    </Button>

                </form>
            </Card>
        )
    }
}

AddProduct.protoType = {
    classes: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    GeoInfo: state.GeoInfo
})

export default connect(mapStateToProps, {uploadFile})(withStyles(styles)(AddProduct))
