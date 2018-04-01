import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { users } from '../../actions/data';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Menu, { MenuItem } from 'material-ui/Menu';
import UserListItemWithMenu from './UserListItemWithMenu';
import { USER_MENU_ID } from '../../constants/index';
import { remove } from '../../actions/data';
import { clearListMenuAnchorEl } from '../../actions/layout';

const mapStateToProps = state => ({
    listMenuAnchorEl: state.layout.listMenuAnchorEl,
    user: state.layout.user,
    users: state.data.users
  }),
  mapDispatchToProps = {
    getUsers: users,
    removeUser: remove,
    clearListMenuAnchorEl: clearListMenuAnchorEl
  };

class UserList extends PureComponent {
  constructor(props) {
    super(props);
    props.getUsers();
  }

  render() {
    const {
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
      <span>
        <List>
          <Hidden smUp>
            <ListSubheader>ToDo - Search Bar</ListSubheader>
          </Hidden>
          {users.map((user, index) => (
            <UserListItemWithMenu key={index} position={index} user={user} />
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

export { USER_MENU_ID };
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
