import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PropTypes from 'prop-types';


class ProductDialog extends Component {

    render() {
        const{fullScreen, open, handleDialogClose} = this.props;
        console.log(this.props.product);
        return (
            <div>
                 <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleDialogClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleDialogClose} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

ProductDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ProductDialog);
