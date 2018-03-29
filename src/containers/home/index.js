import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import { toggleDrawer } from '../../actions/layout';
import About, { PATH as ABOUT_PATH } from '../../components/About';
import AddUser, { PATH as ADD_USER_PATH } from '../../components/AddUser';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import Theme, { PATH as THEME_PATH } from '../../components/Theme';
import UndoSnackbar from '../../components/UndoSnackbar';
import User, { PATH as USER_PATH } from '../../components/User';
import UserList from '../../components/UserList';
import './index.css';

const PATH = '/',
  drawerWidth = 320,
  getTheme = theme =>
    createMuiTheme({
      palette: {
        primary: theme.primary,
        secondary: theme.secondary,
        type: theme.type
      }
    }),
  mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch(toggleDrawer())
  }),
  mapStateToProps = state => ({
    drawerOpen: state.layout.drawerOpen,
    theme: state.theme,
    usersBusy: state.data.usersBusy
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
    }
  });

const Home = props => {
  const { classes, drawerOpen } = props,
    theme = getTheme({
      primary: props.theme.primary,
      secondary: props.theme.secondary,
      type: props.theme.type
    }),
    drawer = (
      <Drawer
        variant="persistent"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar className={classes.drawerHeader} disableGutters={!drawerOpen}>
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid item lg>
              <Typography variant="title" color="textSecondary">
                McPeak Family
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Updated 03/21/18 - 197 users
              </Typography>
            </Grid>
          </Grid>
          {props.usersBusy && <CircularProgress style={{ paddingTop: 5 }} />}
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
          {drawer}

          <User />

          <Route path={ABOUT_PATH} component={About} />
          <Route path={THEME_PATH} component={Theme} />
          <Route path={ADD_USER_PATH} component={AddUser} />
          <Route path={USER_PATH} component={User} />
        </div>
      </div>
      <ErrorSnackbar />
      <UndoSnackbar />
    </MuiThemeProvider>
  );
};

export { PATH };
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
