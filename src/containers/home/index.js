import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Card, { CardContent } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import List from 'material-ui/List';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/blue';

import { THEME_LIGHT } from '../../modules/constants';
import { togglePaletteType } from '../../modules/themeActions';
import {
  changeTab,
  toggleAddUser,
  toggleDrawer
} from '../../modules/layoutActions';

import ListItemWithMenu from '../../components/ListItemWithMenu';
import MainMoreMenu from '../../components/MainMoreMenu';
import About from '../../components/About';
import AddUser from '../../components/AddUser';
import AppSearch from '../../components/AppSearch';

import './index.css';
export const HOME_PATH = '/';

const drawerWidth = 320,
  theme = createMuiTheme({
    palette: {
      primary: { main: green[500] }, // Purple and green play nicely together.
      secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
      type: 'light'
    }
  }),
  styles = theme => ({
    root: {
      flexGrow: 1
    },
    flex: {
      flex: 1
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
  const { activeTab, classes, drawerOpen, user, uiTheme } = props;

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
        <Grid container justify="center" alignItems="flex-start">
          <Grid item lg>
            <Typography variant="title" color="textSecondary">
              McPeak Family
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Updated 03/21/18 - 197 users
            </Typography>
          </Grid>
        </Grid>
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
        <Typography variant="title" color="inherit" className={classes.flex}>
          {user.name}
        </Typography>
        <AppSearch />
        <Tooltip
          id="appbar-theme"
          title="Toggle light/dark theme"
          enterDelay={300}
        >
          <IconButton
            aria-label="Toggle light/dark theme"
            color="inherit"
            onClick={props.togglePaletteType}
            aria-labelledby="appbar-theme"
          >
            {uiTheme.paletteType === THEME_LIGHT ? (
              <Icon>lightbulb_outline</Icon>
            ) : (
              <Icon>highlight</Icon>
            )}
          </IconButton>
        </Tooltip>
        <Tooltip
          id="appbar-user"
          title="Add a new family member"
          enterDelay={300}
        >
          <IconButton
            color="inherit"
            aria-label="Add User"
            onClick={props.toggleAddUser}
          >
            <Icon>person_add</Icon>
          </IconButton>
        </Tooltip>
        <MainMoreMenu />
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
            <About />
            <AddUser open={props.addUserOpen} />
            <Card>
              <CardContent>
                <Tabs value={activeTab} onChange={props.changeTab}>
                  <Tab label="Family Member" />
                  <Tab label="Address" />
                  <Tab label="Spouse" />
                  <Tab label="Dates | Places" />
                  <Tab label="Children | Pets" />
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => ({
  uiTheme: state.theme,
  activeTab: state.layout.activeTab,
  addUserOpen: state.layout.addUserOpen,
  drawerOpen: state.layout.drawerOpen,
  userMenuVisibility: state.layout.userMenuVisibility,
  user: { name: 'Jason & Sheila McPeak' },
  users: [
    { primary: 'Jason & Sheila McPeak', secondary: 'Gaithersburg, MD' },
    { primary: 'Shannon & Tara McPeak', secondary: 'Fremont, WI' },
    { primary: 'Marta & Matt Behrens', secondary: 'Verona, WI' }
  ]
});

const mapDispatchToProps = dispatch => ({
  toggleAddUser: () => dispatch(toggleAddUser()),
  toggleDrawer: () => dispatch(toggleDrawer()),
  changeTab: (event, tab) => dispatch(changeTab(tab)),
  togglePaletteType: () => dispatch(togglePaletteType())
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
