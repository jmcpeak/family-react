import React from 'react';
import { connect } from 'react-redux';
import { actuallyRemove, undoRemove } from '../actions/data';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';

const mapStateToProps = state => ({
    user: state.data.undo,
    open: Object.keys(state.data.undo).length !== 0
  }),
  mapDispatchToProps = {
    actuallyRemove,
    undoRemove
  };

const ErrorSnackbar = props => {
  const onClose = () => props.actuallyRemove(props.user),
    handleClick = () => props.undoRemove(props.user);

  return (
    <Snackbar
      action={
        <Button aria-label="Undo" color="secondary" onClick={handleClick}>
          Undo
        </Button>
      }
      autoHideDuration={5000}
      message={
        <Typography variant="body1" color="inherit">
          {`${props.user.team} was deleted`}
        </Typography>
      }
      onClose={onClose}
      open={props.open}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
