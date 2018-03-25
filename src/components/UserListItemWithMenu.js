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
} from '../actions/layoutActions';
import { LAYOUT_HIDDEN } from '../constants/constants';

const mapStateToProps = state => ({
    userMenus: state.layout.userMenus,
    listMenuAnchorEl: state.layout.listMenuAnchorEl
  }),
  mapDispatchToProps = dispatch => ({
    hideUserMenu: position => dispatch(hideUserMenu(position)),
    showUserMenu: position => dispatch(showUserMenu(position)),
    clearListMenuAnchorEl: () => dispatch(clearListMenuAnchorEl()),
    setListMenuAnchorEl: element => dispatch(setListMenuAnchorEl(element))
  });

const UserListItemWithMenu = props => {
  const { listMenuAnchorEl, position, primary, secondary } = props,
    MENU_ID = 'listMenu',
    mouseOut = () => props.hideUserMenu(position),
    mouseOver = () => props.showUserMenu(position),
    menuClose = () => props.clearListMenuAnchorEl(),
    menuOpen = event => props.setListMenuAnchorEl(event.currentTarget);

  return (
    <ListItem button={true} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <Avatar>
        <Icon>face</Icon>
      </Avatar>
      <ListItemText primary={primary} secondary={secondary} />
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
          <MenuItem onClose={menuClose}>
            <ListItemIcon>
              <Icon>launch</Icon>
            </ListItemIcon>
            <ListItemText inset primary="View" />
          </MenuItem>
          <MenuItem onClose={menuClose}>
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
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserListItemWithMenu
);
