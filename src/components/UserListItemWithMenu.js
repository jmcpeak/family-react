import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';

import {
  hideUserMenu,
  showUserMenu,
  setListMenuAnchorEl
} from '../actions/layout';
import { user } from '../actions/data';
import { LAYOUT_HIDDEN, USER_MENU_ID } from '../constants';

const mapStateToProps = state => ({
    userMenus: state.layout.userMenus,
    listMenuAnchorEl: state.layout.listMenuAnchorEl
  }),
  mapDispatchToProps = {
    setUser: user,
    hideUserMenu: hideUserMenu,
    showUserMenu: showUserMenu,
    setListMenuAnchorEl: setListMenuAnchorEl
  };

const UserListItemWithMenu = props => {
  const { listMenuAnchorEl, position, user } = props,
    ICON_BUTTON_ID = `iconButtonMenu${position}`,
    mouseOut = () => props.hideUserMenu(position),
    mouseOver = () => props.showUserMenu(position),
    setUser = () => props.setUser(user);

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
          id={ICON_BUTTON_ID}
          aria-label="Menu"
          aria-owns={listMenuAnchorEl ? USER_MENU_ID : null}
          aria-haspopup="true"
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          onClick={event =>
            props.setListMenuAnchorEl(event.currentTarget, user)
          }
        >
          <Icon>more_vert</Icon>
        </IconButton>
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
