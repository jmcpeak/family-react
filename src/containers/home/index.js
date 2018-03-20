import React from 'react';
import { connect } from 'react-redux';
import Clock, { Welcome } from './clock';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import List from 'material-ui/List';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';

import { logout } from '../../modules/authActions';
import { toggleDrawer } from '../../modules/layoutActions';
import ListItemWithMenu from '../listItemWithMenu';
import MainMoreMenu from '../mainMoreMenu';

import './index.css';
export const HOME_PATH = '/';

const drawerWidth = 320,
  theme = createMuiTheme({
    palette: {
      primary: { main: green[500] }, // Purple and green play nicely together.
      secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
    }
  }),
  styles = theme => ({
    root: {
      flexGrow: 1
    },
    appFrame: {
      height: '100%',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%'
    },
    appBar: {
      position: 'absolute',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    'appBarShift-left': {
      marginLeft: drawerWidth
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20
    },
    hide: {
      display: 'none'
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    'content-left': {
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    'contentShift-left': {
      marginLeft: 0
    }
  });

const Home = props => {
  const { classes, drawerOpen, user } = props;

  const users = (
    <List>
      {props.users.map((v, i) => (
        <ListItemWithMenu
          key={i}
          position={i}
          primary={v.primary}
          secondary={v.secondary}
        />
      ))}
    </List>
  );

  const drawer = (
    <Drawer
      variant="persistent"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar className={classes.drawerHeader} disableGutters={!drawerOpen}>
        <div>
          <Typography variant="title" color="inherit" align="left">
            McPeak Family
          </Typography>
        </div>
        <IconButton onClick={props.toggleDrawer}>
          <Icon>chevron_left</Icon>
        </IconButton>
      </Toolbar>
      {users}
    </Drawer>
  );

  const appBar = (
    <AppBar
      className={classNames(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
        [classes[`appBarShift-left`]]: drawerOpen
      })}
    >
      <Toolbar disableGutters={!drawerOpen}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleDrawer}
          className={classNames(classes.menuButton, drawerOpen && classes.hide)}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Grid container justify="space-between" alignItems="center">
          <Grid item lg>
            <Typography variant="title" color="inherit">
              {user.name}
            </Typography>
          </Grid>
          <Grid item lg style={{ textAlign: 'center' }}>
            <Typography color="inherit">
              Last Update: Sunday, March 18, 2018
            </Typography>
            <Typography color="inherit">with 197 family members</Typography>
          </Grid>
          <Grid item lg>
            <MainMoreMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {appBar}
          {drawer}
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: drawerOpen,
              [classes['contentShift-left']]: drawerOpen
            })}
          >
            <div className={classes.drawerHeader} />

            <Clock />
            <Welcome name={'Sheila'} />
            <button onClick={props.logout}>Logout</button>
          </main>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => ({
  drawerOpen: state.layout.drawerOpen,
  userMenuVisibility: state.layout.userMenuVisibility,
  user: { name: 'Jason McPeak' },
  users: [
    { primary: 'Jason & Sheila McPeak', secondary: 'Gaithersburg, MD' },
    { primary: 'Shannon & Tara McPeak', secondary: 'Fremont, WI' },
    { primary: 'Marta & Matt Behrens', secondary: 'Verona, WI' }
  ]
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  toggleDrawer: () => dispatch(toggleDrawer())
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
