import React from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/List';
import UserListItemWithMenu from './UserListItemWithMenu';

const mapStateToProps = () => ({
  users: [
    { primary: 'Jason & Sheila McPeak', secondary: 'Gaithersburg, MD' },
    { primary: 'Shannon & Tara McPeak', secondary: 'Fremont, WI' },
    { primary: 'Marta & Matt Behrens', secondary: 'Verona, WI' }
  ]
});

const UserList = props => (
  <List>
    {props.users.map((user, index) => (
      <UserListItemWithMenu
        key={index}
        position={index}
        primary={user.primary}
        secondary={user.secondary}
      />
    ))}
  </List>
);

export default connect(mapStateToProps)(UserList);
