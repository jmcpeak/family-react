import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import {
  hideUserMenu,
  showUserMenu,
  clearMenuAnchorEl,
  setMenuAnchorEl
} from '../../modules/layoutActions';
import { LAYOUT_HIDDEN } from '../../modules/constants';
const styles = () => ({});

const ListItemWithMenu = props => {
  const { menuAnchorEl, position, primary, secondary } = props,
    USER_MENU_ID = 'userMenu',
    mouseOut = () => props.hideUserMenu(position),
    mouseOver = () => props.showUserMenu(position),
    menuClose = () => props.clearMenuAnchorEl(),
    menuOpen = event => props.setMenuAnchorEl(event.currentTarget);

  return (
    <ListItem onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <Avatar>
        <Icon>face</Icon>
      </Avatar>
      <ListItemText primary={primary} secondary={secondary} />
      <ListItemSecondaryAction
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        style={{
          visibility: props.userMenus[position]
            ? props.userMenus[position]
            : LAYOUT_HIDDEN
        }}
      >
        <IconButton
          aria-label="Menu"
          aria-owns={menuAnchorEl ? USER_MENU_ID : null}
          aria-haspopup="true"
          onClick={menuOpen}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id={USER_MENU_ID}
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={menuClose}
        >
          <MenuItem onClose={menuClose}>View</MenuItem>
          <MenuItem onClose={menuClose}>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const mapStateToProps = state => ({
  userMenus: state.layout.userMenus,
  menuAnchorEl: state.layout.menuAnchorEl
});

const mapDispatchToProps = dispatch => ({
  hideUserMenu: position => dispatch(hideUserMenu(position)),
  showUserMenu: position => dispatch(showUserMenu(position)),
  clearMenuAnchorEl: () => dispatch(clearMenuAnchorEl()),
  setMenuAnchorEl: element => dispatch(setMenuAnchorEl(element))
});

ListItemWithMenu.propTypes = {
  position: PropTypes.number.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ListItemWithMenu)
);
