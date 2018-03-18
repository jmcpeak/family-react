import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Clock, { Welcome } from './clock';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import logo from './logo.svg';
import './index.css';
import { logout } from '../../modules/authActions';
export const HOME_PATH = '/';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
  }
});

class Home extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Clock />
          <Welcome name={'Sheila'} />

          <button onClick={this.props.logout}>Logout</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  something: state.something
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
