import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Tooltip from 'material-ui/Tooltip';
import { clearMoreMenuAnchorEl, setMoreMenuAnchorEl } from '../actions/layout';
import { logout } from '../actions/auth';
import { PATH as ABOUT_PATH } from './About';
import { PATH as THEME_PATH } from './Theme';

const mapStateToProps = state => ({
    moreMenuAnchorEl: state.layout.moreMenuAnchorEl
  }),
  mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(clearMoreMenuAnchorEl());
      dispatch(logout());
    },
    clearMoreMenuAnchorEl: () => dispatch(clearMoreMenuAnchorEl()),
    setMoreMenuAnchorEl: element => dispatch(setMoreMenuAnchorEl(element))
  });

const MainMoreMenu = props => {
  const { logout, moreMenuAnchorEl } = props,
    MORE_MENU_ID = 'moreMenuId',
    menuClose = () => props.clearMoreMenuAnchorEl(),
    menuOpen = event => props.setMoreMenuAnchorEl(event.currentTarget),
    about = () => {
      props.history.push(ABOUT_PATH);
      menuClose();
    },
    theme = () => {
      props.history.push(THEME_PATH);
      menuClose();
    };

  return (
    <section>
      <Tooltip id="appbar-menu" title="More actions available" enterDelay={300}>
        <IconButton
          color="inherit"
          aria-label="More Menu"
          aria-owns={moreMenuAnchorEl ? MORE_MENU_ID : null}
          aria-haspopup="true"
          onClick={menuOpen}
        >
          <Icon>more_vert</Icon>
        </IconButton>
      </Tooltip>
      <Menu
        id={MORE_MENU_ID}
        anchorEl={moreMenuAnchorEl}
        open={Boolean(moreMenuAnchorEl)}
        onClose={menuClose}
      >
        <MenuItem onClick={theme}>
          <ListItemIcon>
            <Icon>color_lens</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Theme Colors" />
        </MenuItem>
        <MenuItem onClick={about}>
          <ListItemIcon>
            <Icon>speaker_notes</Icon>
          </ListItemIcon>
          <ListItemText inset primary="About" />
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Logout" />
        </MenuItem>
      </Menu>
    </section>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainMoreMenu)
);
