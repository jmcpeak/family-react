import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import clover from '../../assets/clover.png';
import './index.css';
import { clear } from '../../actions/auth';
// import Icon from 'material-ui/Icon';
// import { InputAdornment } from 'material-ui/Input';

export const LOGIN_PATH = '/login';

const Login = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <img src={clover} alt="Four leaf clover" />
      <Field
        autoComplete="question"
        autoFocus
        className={'question'}
        component={TextField}
        error={props.isError}
        helperText={props.errorMessage}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <Icon>location_city</Icon>
        //     </InputAdornment>
        //   )
        // }}
        label="What city is the Family Reunion usually held in?"
        margin="normal"
        name="question"
        onChange={props.clear}
      />
      <Button size="small" variant="raised" color="primary" type="submit">
        Login
      </Button>
    </form>
  </div>
);

const LoginForm = reduxForm({
  form: 'loginForm'
})(Login);

const mapStateToProps = state => ({
  isError: !!state.auth.error,
  errorMessage:
    state.auth.error && state.auth.error.response
      ? state.auth.error.response.data.error
      : ''
});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clear())
});

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
