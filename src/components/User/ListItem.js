import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import withWidth, { isWidthDown } from 'material-ui/utils/withWidth';
import Icon from 'material-ui/Icon';
import {
  ListItem as MdListItem,
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
    hideUserMenu,
    showUserMenu,
    setListMenuAnchorEl
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

const ListItem = props => {
  const { classes, listMenuAnchorEl, position, user, width } = props,
    ICON_BUTTON_ID = `iconButtonMenu${position}`,
    mouseOut = () => props.hideUserMenu(position),
    mouseOver = () => props.showUserMenu(position),
    setUser = () => {
      props.history.push(
        `${isWidthDown('sm', width) ? '/drawer/' : '/'}${user.team}/${
          user.todoId
        }/`
      );
    };

  return (
    <MdListItem
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
        <Hidden smDown>
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
        </Hidden>
      </ListItemSecondaryAction>
    </MdListItem>
  );
};

ListItem.propTypes = {
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(
  compose(withStyles(styles), withWidth())(
    connect(mapStateToProps, mapDispatchToProps)(ListItem)
  )
);
