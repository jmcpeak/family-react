import React from 'react';
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
import { PATH as HOME_PATH } from '../containers/home';
import { ADD_USER_FORM_NAME } from '../constants';

const PATH = '/add',
  AddUser = props => (
    <Drawer anchor={'right'} open={true}>
      <AppBar position={'static'} color={'secondary'}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            {'Add Family '}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Close Add User"
            onClick={() => props.history.push(HOME_PATH)}
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
  form: ADD_USER_FORM_NAME,
  onSubmit: (values, dispatch, props) =>
    dispatch(add(props.history.push, HOME_PATH))
})(AddUser);

export { PATH };
export default AddUserForm;
