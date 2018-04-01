import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
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
} from '../../actions/layout';
import { LAYOUT_HIDDEN, USER_MENU_ID } from '../../constants/index';

const mapStateToProps = state => ({
    userMenus: state.layout.userMenus,
    listMenuAnchorEl: state.layout.listMenuAnchorEl
  }),
  mapDispatchToProps = {
    hideUserMenu: hideUserMenu,
    showUserMenu: showUserMenu,
    setListMenuAnchorEl: setListMenuAnchorEl
  },
  styles = theme => ({
    selectedItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary': {
          color: theme.palette.common.white
        },
        '& $colorSecondary': {
          color: theme.palette.primary.main
        },
        '& $colorDefault': {
          backgroundColor: theme.palette.common.white
        }
      }
    },
    primary: {},
    colorDefault: {},
    colorSecondary: {}
  });

const UserListItemWithMenu = props => {
  const { classes, listMenuAnchorEl, position, user } = props,
    ICON_BUTTON_ID = `iconButtonMenu${position}`,
    mouseOut = () => props.hideUserMenu(position),
    mouseOver = () => props.showUserMenu(position),
    setUser = () => props.history.push(`/${user.team}/${user.todoId}/`);

  return (
    <ListItem
      button={true}
      classes={{
        button: classes.selectedItem
      }}
      divider={true}
      onClick={setUser}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <Avatar classes={{ colorDefault: classes.colorDefault }}>
        <Icon
          classes={{ colorSecondary: classes.colorSecondary }}
          color={'secondary'}
        >
          face
        </Icon>
      </Avatar>
      <ListItemText
        classes={{ primary: classes.primary }}
        primary={user.team}
        secondary={user.text}
      />
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

export default withRouter(
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(UserListItemWithMenu)
  )
);
