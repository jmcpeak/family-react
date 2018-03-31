import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import UserList from '../../components/User/List';
import { toggleDrawer } from '../../actions/layout';

const drawerWidth = 320,
  mapDispatchToProps = dispatch => ({
    toggleDrawer: () => dispatch(toggleDrawer())
  }),
  mapStateToProps = state => ({
    drawerOpen: state.layout.drawerOpen,
    theme: state.theme,
    usersBusy: state.data.usersBusy
  }),
  styles = theme => ({
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

const UserListDrawer = props => (
  <Drawer
    variant="persistent"
    open={props.drawerOpen}
    classes={{
      paper: props.classes.drawerPaper
    }}
  >
    <Toolbar
      className={props.classes.drawerHeader}
      disableGutters={!props.drawerOpen}
    >
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
      <Hidden smDown>
        <IconButton onClick={props.toggleDrawer}>
          <Icon>chevron_left</Icon>
        </IconButton>
      </Hidden>
    </Toolbar>
    <UserList />
  </Drawer>
);

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(UserListDrawer)
);
