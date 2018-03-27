import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import {
  hideUserMenu,
  showUserMenu,
  clearListMenuAnchorEl,
  setListMenuAnchorEl
} from '../actions/layout';
import { user, remove } from '../actions/data';
import { LAYOUT_HIDDEN } from '../constants';

const mapStateToProps = state => ({
    userMenus: state.layout.userMenus,
    listMenuAnchorEl: state.layout.listMenuAnchorEl
  }),
  mapDispatchToProps = {
    setUser: user,
    hideUserMenu: hideUserMenu,
    showUserMenu: showUserMenu,
    clearListMenuAnchorEl: clearListMenuAnchorEl,
    setListMenuAnchorEl: setListMenuAnchorEl,
    remove: remove
  };

const UserListItemWithMenu = props => {
  const { listMenuAnchorEl, position, user } = props,
    MENU_ID = 'listMenu',
    mouseOut = () => props.hideUserMenu(position),
    mouseOver = () => props.showUserMenu(position),
    menuClose = () => props.clearListMenuAnchorEl(),
    menuOpen = event => props.setListMenuAnchorEl(event.currentTarget),
    setUser = () => props.setUser(user),
    removeUser = () => {
      // todo - fix - user is not available
      props.remove(user);
      props.clearListMenuAnchorEl();
    },
    setUserAndClose = () => {
      // todo - fix - user is not available
      props.setUser(user);
      props.clearListMenuAnchorEl();
    };

  return (
    <ListItem
      button={true}
      onClick={setUser}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <Avatar>
        <Icon>face</Icon>
      </Avatar>
      <ListItemText primary={user.team} secondary={user.text} />
      <ListItemSecondaryAction
        style={{
          visibility: props.userMenus[position]
            ? props.userMenus[position]
            : LAYOUT_HIDDEN
        }}
      >
        <IconButton
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          aria-label="Menu"
          aria-owns={listMenuAnchorEl ? MENU_ID : null}
          aria-haspopup="true"
          onClick={menuOpen}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id={MENU_ID}
          anchorEl={listMenuAnchorEl}
          open={Boolean(listMenuAnchorEl)}
          onClose={menuClose}
        >
          <MenuItem onClick={setUserAndClose} onClose={menuClose}>
            <ListItemIcon>
              <Icon>launch</Icon>
            </ListItemIcon>
            <ListItemText inset primary="View" />
          </MenuItem>
          <MenuItem onClick={removeUser} onClose={menuClose}>
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

UserListItemWithMenu.propTypes = {
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserListItemWithMenu
);
