import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { users } from '../../actions/data';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Menu, { MenuItem } from 'material-ui/Menu';
import UserListItemWithMenu from './UserListItemWithMenu';
import { USER_MENU_ID } from '../../constants/index';
import { user, remove } from '../../actions/data';
import { clearListMenuAnchorEl } from '../../actions/layout';

const mapStateToProps = state => ({
    listMenuAnchorEl: state.layout.listMenuAnchorEl,
    userProxy: state.layout.user,
    users: state.data.users
  }),
  mapDispatchToProps = {
    getUsers: users,
    removeUser: remove,
    setUser: user,
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
        removeUser,
        setUser,
        userProxy,
        users
      } = this.props,
      menuClose = () => clearListMenuAnchorEl(),
      removeUserAndClose = () => {
        removeUser(userProxy);
        menuClose();
      },
      setUserAndClose = () => {
        setUser(userProxy);
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
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
