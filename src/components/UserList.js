import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { users } from '../actions/dataActions';
import List from 'material-ui/List';
import UserListItemWithMenu from './UserListItemWithMenu';

const mapStateToProps = state => ({
    users: state.data.users
  }),
  mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(users())
  });

class UserList extends PureComponent {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <span>
        <List>
          {this.props.users.map((user, index) => (
            <UserListItemWithMenu
              key={index}
              position={index}
              primary={user.team}
              secondary={user.text}
            />
          ))}
        </List>
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
