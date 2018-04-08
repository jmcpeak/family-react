import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Tooltip from 'material-ui/Tooltip';
import { clearMoreMenuAnchorEl, setMoreMenuAnchorEl } from '../actions/layout';
import { logout } from '../actions/auth';
import { PATH as ABOUT_PATH } from './About';
import { PATH as THEME_PATH } from './Theme';
import { withStyles } from 'material-ui/styles/index';
import compose from 'recompose/compose';

const MORE_MENU_ID = 'moreMenuId',
  mapStateToProps = state => ({
    moreMenuAnchorEl: state.layout.moreMenuAnchorEl
  }),
  mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(clearMoreMenuAnchorEl());
      dispatch(logout());
    },
    menuClose: () => dispatch(clearMoreMenuAnchorEl()),
    menuOpen: event => dispatch(setMoreMenuAnchorEl(event))
  }),
  styles = theme => ({
    root: {
      flexGrow: 1
    },
    flex: {
      flex: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    hide: {
      display: 'none'
    }
  });

const MainMoreMenu = ({
  history,
  logout,
  menuClose,
  menuOpen,
  moreMenuAnchorEl,
  width
}) => (
  <div style={{ marginRight: 10 }}>
    {isWidthUp('sm', width) && (
      <section>
        <Tooltip
          id="appbar-menu"
          title="More actions available"
          enterDelay={300}
        >
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
          <MenuItem
            onClick={() => {
              history.push(THEME_PATH);
              menuClose();
            }}
          >
            <ListItemIcon>
              <Icon>color_lens</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Theme Colors" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push(ABOUT_PATH);
              menuClose();
            }}
          >
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
    )}
  </div>
);

export default withRouter(
  compose(withStyles(styles), withWidth())(
    connect(mapStateToProps, mapDispatchToProps)(MainMoreMenu)
  )
);
