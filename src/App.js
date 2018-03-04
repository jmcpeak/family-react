import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import logo from './logo.svg';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            <Button variant="raised" color="primary">
              Hello World
            </Button>
            <Typography variant="display4" gutterBottom>
              Display 4
            </Typography>
            <Typography variant="display3" gutterBottom>
              Display 3
            </Typography>
            <Typography variant="display2" gutterBottom>
              Display 2
            </Typography>
            <Typography variant="display1" gutterBottom>
              Display 1
            </Typography>
            <Typography variant="headline" gutterBottom>
              Headline
            </Typography>
            <Typography variant="title" gutterBottom>
              Title
            </Typography>
            <Typography variant="subheading" gutterBottom>
              Subheading
            </Typography>
            <Typography variant="body2" gutterBottom>
              Body 2
            </Typography>
            <Typography variant="body1" gutterBottom align="right">
              Body 1
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              Caption
            </Typography>
            <Typography gutterBottom noWrap>
              {`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        `}
            </Typography>
            <Typography variant="button" gutterBottom>
              Button
            </Typography>
          </p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
