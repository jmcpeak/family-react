import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { users } from '../../actions/data';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Menu, { MenuItem } from 'material-ui/Menu';
import ListItem from './ListItem';
import { USER_MENU_ID } from '../../constants/index';
import { remove } from '../../actions/data';
import { clearListMenuAnchorEl } from '../../actions/layout';

const PATH = '/users',
  mapStateToProps = state => ({
    listMenuAnchorEl: state.layout.listMenuAnchorEl,
    user: state.layout.user,
    users: state.data.users
  }),
  mapDispatchToProps = {
    getUsers: users,
    removeUser: remove,
    clearListMenuAnchorEl: clearListMenuAnchorEl
  },
  styles = theme => ({
    toolbar: theme.mixins.toolbar
  });

class UserList extends PureComponent {
  constructor(props) {
    super(props);
    props.getUsers();
  }

  render() {
    const {
        classes,
        clearListMenuAnchorEl,
        listMenuAnchorEl,
        history,
        removeUser,
        user,
        users
      } = this.props,
      menuClose = () => clearListMenuAnchorEl(),
      removeUserAndClose = () => {
        removeUser(user);
        menuClose();
      },
      setUserAndClose = () => {
        history.push(`/${user.team}/${user.todoId}/`);
        menuClose();
      };

    return (
      <span style={{ width: '100%' }}>
        <div className={classes.toolbar} />
        <List>
          <Hidden smUp>
            <ListSubheader>ToDo - Search Here</ListSubheader>
          </Hidden>
          {users.map((user, index) => (
            <ListItem key={index} position={index} user={user} />
          ))}
        </List>
        <Menu
          id={USER_MENU_ID}
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
          <MenuItem onClick={removeUserAndClose} onClose={menuClose}>
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
      </span>
    );
  }
}

export { PATH, USER_MENU_ID };
export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserList))
);
