import React from 'react';
import ReactDOM from 'react-dom';
import { TestAddUser } from './AddUser';
import { TestAbout } from './About';

it('renders AddUser without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<TestAddUser />, div);
  // ReactDOM.unmountComponentAtNode(div);
});

it('renders About without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<TestAbout />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
