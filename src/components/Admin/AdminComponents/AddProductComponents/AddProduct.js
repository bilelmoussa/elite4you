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
import { Add_Products } from '../../../../action/authentication';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme =>({
    paper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#424242",
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
    dialog: {
        width: 'calc(100% - 16px)',
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
            ProductChildCategories: [],
            emptyFields: false,
            womenClothingSize: ['xs','s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'],
            womenShoesSize : [35, 36, 37, 38, 39, 40, 41, 42, 43]

        }
    }

    componentDidMount() {
        let user_role = this.props.user.user.role || "";

        if(!empty(user_role) || user_role === "admin" || user_role === "staff"){
        }else{
            this.props.history.push('/Admin/login');
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
                this.setState({ProductColors: [...ProductColors, Color], Color: ""});
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
                this.setState({ProductSize: [...ProductSize, Size], Size: ""});
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
        if(empty(files) || empty(ProductName) || empty(ProductDescription) || empty(ProductPrice) || empty(ProductDiscount) || empty(ProductQuantity) || empty(ProductColors) || empty(ProductSize) || empty(ProductCategories) || empty(ProductChildCategories)){
            this.setState({emptyFields: true});
        }else{
            let indexOFSymbol = ProductDiscount.indexOf("%");
            const Data = {
                ProductName: ProductName,
                ProductDescription: ProductDescription,
                ProductPrice: Number(ProductPrice),
                ProductDiscount: Number(ProductDiscount.substring(0, indexOFSymbol)),
                ProductQuantity: Number(ProductQuantity),
                ProductColors: ProductColors,
                ProductSize: ProductSize,
                ProductCategories: ProductCategories[0],
                ProductChildCategories: ProductChildCategories[0]
            }

            console.log(Data);
            this.props.Add_Products(files, Data);
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

    exitDialog = () => this.setState({ emptyFields : false });


    render() {
        const {classes} = this.props;
        const {emptyFields} = this.state;

        return (
            <Card className={classes.paper}>
                <Typography className={classes.Title} variant="h6" color="inherit">
                    Add a New Product 
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField 
                        required
                        classes={{root: classes.textField}} 
                        value={this.state.ProductName} 
                        label="Name" 
                        onChange={this.handleChange("ProductName")}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField 
                        required
                        classes={{root: classes.textField}} 
                        value={this.state.ProductDescription} 
                        label="Description" 
                        onChange={this.handleChange("ProductDescription")}
                        margin="normal"
                        variant="filled"
                    />
                    <div className={classes.SelectField}>
                        <FormControl variant="filled" className={classes.FormSelect}>
                        <InputLabel htmlFor="filled-Categorie-native-simple">Categories *</InputLabel>
                            <Select
                                native
                                value={this.state.Categorie}
                                onChange={this.handleChange('Categorie')}
                                input={<FilledInput name="Categorie" id="filled-Categorie-native-simple" />}
                            >
                                <option value="" />
                                <option value={'Man'}>Man</option>
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
                        <InputLabel htmlFor="filled-ChildCategorie-native-simple">Child Categories *</InputLabel>
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
                        required
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
                        required    
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
                        required
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
                        <TextField 
                            style={{margin: "20px 0"}} 
                            value={this.state.Color} 
                            label="Color *" 
                            onChange={this.handleChange("Color")}
                            margin="normal"
                            variant="filled"
                        />
                        <Button 
                            className={classes.select_button}  variant="contained" 
                            color="primary"
                            onClick={this.AddColor}
                        >
                            add color
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
                        <TextField 
                            style={{margin: "20px 0"}} 
                            value={this.state.Size} 
                            label="Size *" 
                            onChange={this.handleChange("Size")}
                            margin="normal"
                            variant="filled"
                        />
                        <Button 
                            className={classes.select_button}  variant="contained" 
                            color="primary"
                            onClick={this.AddSize}
                        >
                            add Size
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

                <Dialog
                    open={emptyFields}
                    onClose={this.exitDialog}
                    classes={{ paper: classes.dialog }}
                >
                <DialogTitle>
                    Some field are Empty
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please fill all fields !
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.exitDialog} color="secondary" >
                    Exit
                    </Button>
                </DialogActions>

            </Dialog>                    

            </Card>
        )
    }
}

AddProduct.protoType = {
    classes: PropTypes.object.isRequired,
    Add_Products: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    GeoInfo: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    GeoInfo: state.GeoInfo,
    user: state.user
})

export default connect(mapStateToProps, {Add_Products})(withStyles(styles)(AddProduct))
