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
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import {
  changeTab,
  toggleAddUser,
  toggleDrawer
} from '../../modules/layoutActions';
import MainMoreMenu from '../../components/MainMoreMenu';
import About from '../../components/About';
import AddUser from '../../components/AddUser';
import AppSearch from '../../components/AppSearch';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import Theme from '../../components/Theme';
import UserList from '../../components/UserList';
import './index.css';
export const HOME_PATH = '/';

const drawerWidth = 320,
  getTheme = theme =>
    createMuiTheme({
      palette: {
        primary: theme.primary,
        secondary: theme.secondary,
        type: theme.type
      }
    }),
  mapDispatchToProps = dispatch => ({
    toggleAddUser: () => dispatch(toggleAddUser()),
    toggleDrawer: () => dispatch(toggleDrawer()),
    changeTab: (event, tab) => dispatch(changeTab(tab))
  }),
  mapStateToProps = state => ({
    activeTab: state.layout.activeTab,
    addUserOpen: state.layout.addUserOpen,
    drawerOpen: state.layout.drawerOpen,
    theme: state.theme,
    userMenuVisibility: state.layout.userMenuVisibility,
    user: { name: 'Jason & Sheila McPeak' }
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
  const { activeTab, classes, drawerOpen, user } = props,
    theme = getTheme({
      primary: props.theme.primary,
      secondary: props.theme.secondary,
      type: props.theme.type
    }),
    appBar = (
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
            className={classNames(
              classes.menuButton,
              drawerOpen && classes.hide
            )}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {user.name}
          </Typography>
          <AppSearch />
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
    ),
    drawer = (
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
        <UserList />
      </Drawer>
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
            <Theme rows={5} columns={4} />
            <AddUser open={props.addUserOpen} />
            <Card>
              <CardContent>
                <Tabs
                  value={activeTab}
                  textColor="primary"
                  onChange={props.changeTab}
                >
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
      <ErrorSnackbar />
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
