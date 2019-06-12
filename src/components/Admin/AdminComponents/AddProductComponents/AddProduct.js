import React, { Component } from 'react'
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
import {isEmpty} from '../../../../is-empty';
import Chip from '@material-ui/core/Chip';
import Upload from '../../../../StyleComponents/upload/Upload';


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
    ColorsField:{
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
  color_button:{
      display: "block",
      width: "30%",
      minWidth: 150,
      overflow: "hidden",
      maxHeight: 40,
      margin: 'auto'
  },
  FormColors:{
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
            ProductPrice: "",
            ProductDiscount: "",
            ProductQuantity: "",
            Color: "",
            ProductColors: [],
            files: []
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    }

    AddColor = () =>{
        const {Color, ProductColors} = this.state;
        if(!isEmpty(Color) && Color != 0){
            this.setState({ProductColors: [...ProductColors, Color], Color: "0"});
        } 
    }

    handleFileChange = (files)=>{
        this.setState({
          files: files
        });
    }
    
    handleDelete = color => () =>{
        const {ProductColors} = this.state;
        const chipToDelete = ProductColors.indexOf(color);
        ProductColors.splice(chipToDelete, 1);
        this.setState({ProductColors: ProductColors})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
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

                    <div className={classes.ColorsField}>
                        <FormControl variant="filled" className={classes.FormColors}>
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
                                <option value={'Grey'}>Black</option>
                            </Select>
                        </FormControl>

                        <Button 
                            className={classes.color_button}  variant="contained" 
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
                                onDelete={this.handleDelete(color)}                  
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
}

export default withStyles(styles)(AddProduct)
