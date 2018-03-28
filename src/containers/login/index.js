import React from 'react';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { InputAdornment } from 'material-ui/Input';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import clover from '../../assets/clover.png';
import './index.css';
import { clear, login } from '../../actions/auth';

const PATH = '/login',
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
        InputProps={props.busy ? progress : undefined}
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
  form: 'login',
  onSubmit: (values, dispatch) => dispatch(login(values))
})(Login);

export { PATH };
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
