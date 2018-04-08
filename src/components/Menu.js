import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import SwipeableDrawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { logout } from '../actions/auth';
import { PATH as ABOUT_PATH } from './About';
import { PATH as THEME_PATH } from './Theme';

const PATH = '/menu/',
  mapStateToProps = () => ({}),
  mapDispatchToProps = { logout };

const Menu = ({ history, logout }) => (
  <SwipeableDrawer onClose={history.goBack} open={true}>
    <Toolbar>
      <div>
        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
          McPeak Family v4.0
        </Typography>
        <Typography variant="subheading" color="inherit" style={{ flex: 1 }}>
          197 Users
        </Typography>
      </div>
      <IconButton color="inherit" aria-label="Close" onClick={history.goBack}>
        <Icon>keyboard_arrow_left</Icon>
      </IconButton>
    </Toolbar>
    <List>
      <ListItem onClick={() => history.push(THEME_PATH)}>
        <ListItemIcon>
          <Icon>color_lens</Icon>
        </ListItemIcon>
        <ListItemText inset primary="Theme Colors" />
      </ListItem>
      <ListItem onClick={() => history.push(ABOUT_PATH)}>
        <ListItemIcon>
          <Icon>speaker_notes</Icon>
        </ListItemIcon>
        <ListItemText inset primary="About" />
      </ListItem>
      <ListItem
        onClick={() => {
          history.goBack();
          logout();
        }}
      >
        <ListItemIcon>
          <Icon>exit_to_app</Icon>
        </ListItemIcon>
        <ListItemText inset primary="Logout" />
      </ListItem>
    </List>
  </SwipeableDrawer>
);

export { PATH };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
