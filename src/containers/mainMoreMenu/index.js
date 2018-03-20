import React from 'react';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import {
  clearMoreMenuAnchorEl,
  setMoreMenuAnchorEl
} from '../../modules/layoutActions';

const MainMoreMenu = props => {
  const { moreMenuAnchorEl } = props,
    MORE_MENU_ID = 'moreMenuId',
    moreMenuClose = () => props.clearMoreMenuAnchorEl(),
    moreMenuOpen = event => props.setMoreMenuAnchorEl(event.currentTarget);

  return (
    <span>
      <IconButton
        aria-label="More Menu"
        aria-owns={moreMenuAnchorEl ? MORE_MENU_ID : null}
        aria-haspopup="true"
        onClick={moreMenuOpen}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu
        id={MORE_MENU_ID}
        anchorEl={moreMenuAnchorEl}
        open={Boolean(moreMenuAnchorEl)}
        onClose={moreMenuClose}
      >
        <MenuItem onClose={moreMenuClose}>
          <ListItemIcon>
            <Icon>email</Icon>
          </ListItemIcon>
          <ListItemText inset primary="E-mail All" />
        </MenuItem>
        <MenuItem onClose={moreMenuClose}>
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Delete" />
        </MenuItem>
        <MenuItem onClose={moreMenuClose}>
          <ListItemIcon>
            <Icon>file_download</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Export" />
        </MenuItem>
        <MenuItem onClose={moreMenuClose}>
          <ListItemIcon>
            <Icon>speaker_notes</Icon>
          </ListItemIcon>
          <ListItemText inset primary="About" />
        </MenuItem>
      </Menu>
    </span>
  );
};

const mapStateToProps = state => ({
  moreMenuAnchorEl: state.layout.moreMenuAnchorEl
});

const mapDispatchToProps = dispatch => ({
  clearMoreMenuAnchorEl: () => dispatch(clearMoreMenuAnchorEl()),
  setMoreMenuAnchorEl: element => dispatch(setMoreMenuAnchorEl(element))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMoreMenu);
