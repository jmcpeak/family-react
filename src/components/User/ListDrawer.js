import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import UserList from '../../components/User/List';

const drawerWidth = 380,
  mapStateToProps = state => ({
    open: state.layout.usersOpen
  }),
  mapDispatchToProps = {},
  styles = () => ({
    drawerPaper: {
      position: 'relative',
      width: drawerWidth
    }
  });

const UserListDrawer = ({ classes, open }) => (
  <Drawer
    classes={{ paper: classes.drawerPaper }}
    open={open}
    variant="persistent"
  >
    <UserList />
  </Drawer>
);

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(UserListDrawer)
);
