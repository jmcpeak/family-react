import React from 'react';
import ReactDOM from 'react-dom';
import MainMoreMenu from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainMoreMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
