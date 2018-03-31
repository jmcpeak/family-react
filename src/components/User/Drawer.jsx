import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import UserFormAdd from './Form/Add';

const PATH = '/add',
  UserDrawer = props => (
    <Drawer anchor="right" open={true}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            Add
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Close Add"
            onClick={props.history.goBack}
          >
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <UserFormAdd history={props.history} />
    </Drawer>
  );

export { PATH };
export default UserDrawer;
