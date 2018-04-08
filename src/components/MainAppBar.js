import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleUsersDrawer, toggleMenuDrawer } from '../actions/layout';
import { withStyles } from 'material-ui/styles/index';
import compose from 'recompose/compose';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import AppSearch from './AppSearch';
import MainMoreMenu from './MainMoreMenu';
import { PATH as USER_ADD } from './User/Form/Drawer';

const mapDispatchToProps = {
    toggleUsersDrawer,
    toggleMenuDrawer
  },
  mapStateToProps = state => ({
    open: state.layout.usersOpen,
    theme: state.theme,
    user: state.data.user
  }),
  styles = theme => ({
    root: {
      flexGrow: 1
    },
    flex: {
      flex: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20
    },
    hide: {
      display: 'none'
    }
  });

const MainAppBar = ({
  classes,
  history,
  toggleUsersDrawer,
  toggleMenuDrawer,
  user,
  width
}) => (
  <AppBar position="absolute" className={classes.appBar}>
    <Toolbar disableGutters>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          if (isWidthUp('sm', width)) toggleUsersDrawer();
          else toggleMenuDrawer();
        }}
        className={classes.menuButton}
      >
        <Icon>menu</Icon>
      </IconButton>

      <Typography variant="title" color="inherit" className={classes.flex}>
        {user && user.team
          ? `${user.team} ${user.text ? '&' : ''} ${user.text ? user.text : ''}`
          : 'Select a user'}
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
          onClick={() => history.push(USER_ADD)}
        >
          <Icon>person_add</Icon>
        </IconButton>
      </Tooltip>
      <MainMoreMenu />
    </Toolbar>
  </AppBar>
);

export default withRouter(
  compose(withStyles(styles), withWidth())(
    connect(mapStateToProps, mapDispatchToProps)(MainAppBar)
  )
);
