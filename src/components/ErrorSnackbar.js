import React from 'react';
import { connect } from 'react-redux';
import { clearError } from '../actions/data';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';

const mapStateToProps = state => ({
    error: state.data.error,
    open: Object.keys(state.data.error).length !== 0
  }),
  mapDispatchToProps = {
    close: clearError
  };

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
        {props.error && props.error.message
          ? props.error.message
          : 'Error not properly formatted'}{' '}
        &nbsp;
        {props.error && props.error.code ? `code: ${props.error.code}` : ''}
      </Typography>
    }
    open={props.open}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
