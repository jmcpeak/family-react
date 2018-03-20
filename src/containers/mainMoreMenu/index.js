import React from 'react';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import {
  aboutOpen,
  clearMoreMenuAnchorEl,
  setMoreMenuAnchorEl
} from '../../modules/layoutActions';
import { logout } from '../../modules/authActions';

const MainMoreMenu = props => {
  const { moreMenuAnchorEl } = props,
    MORE_MENU_ID = 'moreMenuId',
    menuClose = () => props.clearMoreMenuAnchorEl(),
    menuOpen = event => props.setMoreMenuAnchorEl(event.currentTarget);

  return (
    <span style={{ float: 'right' }}>
      <IconButton
        color="inherit"
        aria-label="More Menu"
        aria-owns={moreMenuAnchorEl ? MORE_MENU_ID : null}
        aria-haspopup="true"
        onClick={menuOpen}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu
        id={MORE_MENU_ID}
        anchorEl={moreMenuAnchorEl}
        open={Boolean(moreMenuAnchorEl)}
        onClose={menuClose}
      >
        <MenuItem>
          <ListItemIcon>
            <Icon>email</Icon>
          </ListItemIcon>
          <ListItemText inset primary="E-mail All" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Delete" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Icon>file_download</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Export" />
        </MenuItem>
        <MenuItem onClick={props.aboutOpen}>
          <ListItemIcon>
            <Icon>speaker_notes</Icon>
          </ListItemIcon>
          <ListItemText inset primary="About" />
        </MenuItem>
        <MenuItem onClick={props.logout}>
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Logout" />
        </MenuItem>
      </Menu>
    </span>
  );
};

const mapStateToProps = state => ({
  moreMenuAnchorEl: state.layout.moreMenuAnchorEl
});

const mapDispatchToProps = dispatch => ({
  aboutOpen: () => {
    dispatch(clearMoreMenuAnchorEl());
    dispatch(aboutOpen());
  },
  logout: () => {
    dispatch(clearMoreMenuAnchorEl());
    dispatch(logout());
  },
  clearMoreMenuAnchorEl: () => dispatch(clearMoreMenuAnchorEl()),
  setMoreMenuAnchorEl: element => dispatch(setMoreMenuAnchorEl(element))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMoreMenu);
