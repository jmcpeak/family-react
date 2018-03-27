import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { add } from '../actions/data';
import { toggleAddUser } from '../actions/layout';

const mapStateToProps = state => ({
    open: state.layout.addUserOpen
  }),
  mapDispatchToProps = {
    toggle: toggleAddUser
  };

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
    <main>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field autoFocus component={TextField} label="Team" name="team" />
        </div>
        <div>
          <Field component={TextField} label="Text" name="text" />
        </div>
        <div>
          <Button color="primary" variant="raised" type="submit">
            Add
          </Button>
        </div>
      </form>
    </main>
  </Drawer>
);

const AddUserForm = reduxForm({
  form: 'add',
  onSubmit: (values, dispatch) => dispatch(add(values))
})(AddUser);

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
