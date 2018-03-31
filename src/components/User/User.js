import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Card, { CardContent } from 'material-ui/Card';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';
import { user } from '../../actions/data';
import { changeTab, toggleDrawer } from '../../actions/layout';
import MainMoreMenu from '../MainMoreMenu';
import { PATH as USER_DRAWER_PATH } from './Drawer';
import AppSearch from '../AppSearch';

const PATH = '/:team/:id',
  drawerWidth = 320,
  mapDispatchToProps = dispatch => ({
    getUser: (team, id) => dispatch(user(team, id)),
    changeTab: (event, tab) => dispatch(changeTab(tab)),
    toggleDrawer: () => dispatch(toggleDrawer())
  }),
  mapStateToProps = state => ({
    activeTab: state.layout.activeTab,
    drawerOpen: state.layout.drawerOpen,
    theme: state.theme,
    user: state.data.user
  }),
  styles = theme => ({
    flex: {
      flex: 1
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

class User extends React.Component {
  currentUserParams = {};

  constructor(props) {
    super(props);

    const { params } = props.match;

    if (this.currentUserParams.id !== params.id) {
      props.getUser(params.team, params.id);
      this.currentUserParams = params;
    }
  }

  componentDidUpdate() {
    const { params } = this.props.match;

    if (this.currentUserParams.id !== params.id) {
      this.props.getUser(params.team, params.id);
      this.currentUserParams = params;
    }
  }

  render() {
    const {
        activeTab,
        changeTab,
        classes,
        drawerOpen,
        history,
        toggleDrawer,
        user
      } = this.props,
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
              onClick={toggleDrawer}
              className={classNames(
                classes.menuButton,
                drawerOpen && classes.hide
              )}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {user
                ? `${user.team} ${user.text ? '&' : ''} ${
                    user.text ? user.text : ''
                  }`
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
                onClick={() => history.push(USER_DRAWER_PATH)}
              >
                <Icon>person_add</Icon>
              </IconButton>
            </Tooltip>
            <MainMoreMenu />
          </Toolbar>
        </AppBar>
      );

    return (
      <span>
        {appBar}
        <main
          className={classNames(classes.content, classes['content-left'], {
            [classes.contentShift]: drawerOpen,
            [classes['contentShift-left']]: drawerOpen
          })}
        >
          <div className={classes.drawerHeader} />
          <Card>
            <CardContent>
              <Tabs value={activeTab} textColor="primary" onChange={changeTab}>
                <Tab label="Family Member" />
                <Tab label="Address" />
                <Tab label="Spouse" />
                <Tab label="Dates | Places" />
                <Tab label="Children | Pets" />
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </span>
    );
  }
}

export { PATH };
export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(User))
);
