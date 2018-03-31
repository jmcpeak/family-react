import React from 'react';
import Button from 'material-ui/Button';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { add } from '../../../actions/data';
import { PATH as HOME_PATH } from '../../Home';
import { ADD_USER_FORM_NAME } from '../../../constants';

const Form = props => (
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
);

const UserFormAdd = reduxForm({
  form: ADD_USER_FORM_NAME,
  onSubmit: (values, dispatch, props) =>
    dispatch(add(props.history.push, HOME_PATH))
})(Form);

export default UserFormAdd;
