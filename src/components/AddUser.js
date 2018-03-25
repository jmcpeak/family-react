import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { toggleAddUser } from '../actions/layoutActions';

const mapStateToProps = state => ({
    open: state.layout.addUserOpen
  }),
  mapDispatchToProps = dispatch => ({
    toggle: () => dispatch(toggleAddUser())
  });

const AddUser = props => (
  <Drawer anchor={'right'} open={props.open}>
    <AppBar position={'static'} color={'secondary'}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
          {'Add Family '}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Close Add User"
          onClick={props.toggle}
        >
          <Icon>close</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
    <h1>Hi mom kjhkh kjhkjh kjhkjhkjh kjhkjhk kjhkjh</h1>
  </Drawer>
);

AddUser.propTypes = {
  open: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
