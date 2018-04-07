import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import UserList from '../../components/User/List';
import { toggleDrawer } from '../../actions/layout';

const drawerWidth = 320,
  mapDispatchToProps = {
    toggleDrawer: toggleDrawer
  },
  mapStateToProps = state => ({
    open: state.layout.open
  }),
  styles = theme => ({
    drawerPaper: {
      position: 'relative',
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar
  });

const UserListDrawer = ({ classes, open }) => (
  <Drawer
    classes={{ paper: classes.drawerPaper }}
    open={open}
    variant="persistent"
  >
    <div className={classes.toolbar} />
    <UserList />
  </Drawer>
);

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(UserListDrawer)
);
