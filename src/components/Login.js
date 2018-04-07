import React from 'react';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { InputAdornment } from 'material-ui/Input';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import clover from '../assets/clover.png';
import './Login.css';
import { clear, login } from '../actions/auth';

const FORM = 'login',
  PATH = `/${FORM}`,
  progress = {
    endAdornment: (
      <InputAdornment position="start">
        <CircularProgress />
      </InputAdornment>
    )
  },
  mapStateToProps = state => ({
    busy: state.auth.busy,
    disabled: state.auth.disabled,
    isError: !!state.auth.error,
    errorMessage:
      state.auth.error && state.auth.error.response
        ? state.auth.error.response.data.error
        : ''
  }),
  mapDispatchToProps = {
    clear: clear
  };

const Login = ({
  busy,
  clear,
  disabled,
  errorMessage,
  handleSubmit,
  isError
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <img src={clover} alt="Four leaf clover" />
      <Field
        autoComplete="question"
        autoFocus
        className={'question'}
        component={TextField}
        disabled={disabled}
        error={isError}
        helperText={errorMessage}
        InputProps={busy ? progress : undefined}
        label="What city is the Family Reunion usually held in?"
        margin="normal"
        name="question"
        onChange={clear}
      />
      <Button
        color="primary"
        disabled={disabled}
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
  form: FORM,
  onSubmit: (values, dispatch) => dispatch(login(values))
})(Login);

export { PATH };
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
