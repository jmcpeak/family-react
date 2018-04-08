import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import { user } from '../../actions/data';
import { changeTab } from '../../actions/layout';

const PATH = '/:team/:id',
  drawerWidth = 320,
  mapDispatchToProps = dispatch => ({
    getUser: (team, id) => dispatch(user(team, id)),
    changeTab: (event, tab) => dispatch(changeTab(tab))
  }),
  mapStateToProps = state => ({
    activeTab: state.layout.activeTab,
    open: state.layout.usersOpen,
    theme: state.theme,
    user: state.data.user
  }),
  styles = theme => ({
    flex: {
      flex: 1
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
    },
    toolbar: theme.mixins.toolbar
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
    const { activeTab, changeTab, classes, open, user } = this.props;

    return (
      <span>
        <div className={classes.toolbar} />
        <main
          className={classNames(classes.content, classes['content-left'], {
            [classes.contentShift]: open,
            [classes['contentShift-left']]: open
          })}
        >
          <Card>
            <CardContent>
              {user.team}
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
