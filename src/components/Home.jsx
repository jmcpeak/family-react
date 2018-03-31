import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import About, { PATH as ABOUT_PATH } from './About';
import UserDrawer, { PATH as USER_DRAWER_PATH } from './User/Drawer';
import ErrorSnackbar from './ErrorSnackbar';
import Theme, { PATH as THEME_PATH } from './Theme';
import UndoSnackbar from './UndoSnackbar';
import User, { PATH as USER_PATH } from './User/User';
import UserListDrawer from './User/ListDrawer';
import './Home.css';

const PATH = '/',
  getTheme = theme =>
    createMuiTheme({
      palette: {
        primary: theme.primary,
        secondary: theme.secondary,
        type: theme.type
      }
    }),
  mapStateToProps = state => ({
    theme: state.theme,
    user: state.data.user
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
    center: {
      float: 'left',
      position: 'relative',
      left: '50%',
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0.35
    }
  });

const Home = props => {
  const { classes, user } = props,
    theme = getTheme({
      primary: props.theme.primary,
      secondary: props.theme.secondary,
      type: props.theme.type
    }),
    empty = (
      <div>
        <Typography
          variant="display1"
          color="textSecondary"
          className={classes.center}
        >
          No Family Member Selected
        </Typography>
      </div>
    );

  return (
    <MuiThemeProvider theme={theme}>
      {/*<React.StrictMode>*/}
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <UserListDrawer />

          <Hidden smDown>
            {Object.keys(user).length === 0 && empty}
            <Route path={USER_PATH} component={User} />
          </Hidden>

          <Route path={ABOUT_PATH} component={About} />

          <Route path={USER_DRAWER_PATH} component={UserDrawer} />
        </div>
      </div>

      <Route path={THEME_PATH} component={Theme} />
      <ErrorSnackbar />
      <UndoSnackbar />
      {/*</React.StrictMode>*/}
    </MuiThemeProvider>
  );
};

export { PATH };
export default withStyles(styles)(connect(mapStateToProps)(Home));
