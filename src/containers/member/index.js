import React, { Component } from 'react';
// import { createStore, combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import Button from 'material-ui/Button';
// import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormGroup } from 'material-ui/Form';

export const MEMBER_PATH = '/member';

// import './Login.css';

// const rootReducer = combineReducers({
//     // ...your other reducers here
//     // you have to pass formReducer under 'form' key,
//     // for custom keys look up the docs for 'getFormState'
//     form: formReducer
// });

// const store = createStore(rootReducer);

export default class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <InputLabel>Email</InputLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Password</InputLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button disabled={!this.validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
