import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { InputAdornment } from 'material-ui/Input';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import clover from '../../assets/clover.png';
import './index.css';
import { clear } from '../../actions/auth';

export const LOGIN_PATH = '/login',
  PROGRESS = {
    endAdornment: (
      <InputAdornment position="start">
        <CircularProgress />
      </InputAdornment>
    )
  };

const Login = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <img src={clover} alt="Four leaf clover" />
      <Field
        autoComplete="question"
        autoFocus
        className={'question'}
        component={TextField}
        disabled={props.disabled}
        error={props.isError}
        helperText={props.errorMessage}
        InputProps={props.busy ? PROGRESS : undefined}
        label="What city is the Family Reunion usually held in?"
        margin="normal"
        name="question"
        onChange={props.clear}
      />
      <Button
        color="primary"
        disabled={props.disabled}
        size="small"
        type="submit"
        variant="raised"
      >
        Login
      </Button>
    </form>
  </div>
);

const LoginForm = reduxForm({
  form: 'loginForm'
})(Login);

const mapStateToProps = state => ({
  busy: state.auth.busy,
  disabled: state.auth.disabled,
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
