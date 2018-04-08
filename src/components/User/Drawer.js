import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import SwipeableDrawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import User from '../User/User';

const styles = () => ({
  drawerPaper: {
    width: '100%'
  }
});

const PATH = '*/drawer/:team/:id',
  UserDrawer = ({ classes, history, match }) => (
    <SwipeableDrawer
      anchor="right"
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{ hideBackdrop: true }}
      open={true}
    >
      <AppBar position="static" color="secondary">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="Close Add"
            onClick={history.goBack}
          >
            <Icon>keyboard_arrow_left</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            {match.params.team}
          </Typography>
        </Toolbar>
      </AppBar>
      <User />
    </SwipeableDrawer>
  );

export { PATH };
export default withStyles(styles)(UserDrawer);
