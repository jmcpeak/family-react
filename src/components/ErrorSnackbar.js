import React from 'react';
import { connect } from 'react-redux';
import { clearError } from '../modules/dataActions';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';

const mapStateToProps = state => ({
    error: state.data.error,
    open: Object.keys(state.data.error).length !== 0
  }),
  mapDispatchToProps = dispatch => ({
    close: () => dispatch(clearError())
  });

const ErrorSnackbar = props => (
  <Snackbar
    action={
      <IconButton aria-label="Close" color="inherit" onClick={props.close}>
        <Icon>close</Icon>
      </IconButton>
    }
    autoHideDuration={null}
    message={
      <Typography variant="body1" color="error">
        {props.error.message} &nbsp; "{props.error.code}"
      </Typography>
    }
    open={props.open}
    transition={props => <Slide direction="up" {...props} />}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
