import React from 'react';
import ReactDOM from 'react-dom';
import ListItemWithMenu from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListItemWithMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
