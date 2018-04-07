import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/layout';
import { withStyles } from 'material-ui/styles/index';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import AppSearch from './AppSearch';
import MainMoreMenu from './MainMoreMenu';
import { PATH as ADD_USER } from './User/Drawer';

const mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch(toggleDrawer())
  }),
  mapStateToProps = state => ({
    open: state.layout.open,
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

const MainAppBar = ({ classes, history, toggleDrawer, user }) => (
  <AppBar position="absolute" className={classes.appBar}>
    <Toolbar disableGutters>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        className={classes.menuButton}
      >
        <Icon>menu</Icon>
      </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
        {user
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
          onClick={() => history.push(ADD_USER)}
        >
          <Icon>person_add</Icon>
        </IconButton>
      </Tooltip>
      <MainMoreMenu />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MainAppBar))
);
