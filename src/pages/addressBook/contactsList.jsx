import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/input/search';
import List from 'components/usersList';
import selectors from './selectors';
import * as actions from './actions';

const { arrayOf, shape, string } = PropTypes;

const styles = {
  search: {
    margin: '15px auto',
    padding: '7px',
  },
  addContact: {
    cursor: 'pointer',
    border: '1px solid #000',
    padding: '7px',
    backgroundColor: '#eee',
  },
};

class contactsList extends PureComponent {
  static propTypes = {
    users: arrayOf(
      shape({
        name: string.isRequired,
        email: string.isRequired,
        id: string.isRequired,
      }),
    ),
    selectedUser: shape({
      id: string,
      name: string.isRequired,
      email: string.isRequired,
    }),
  };
  static defaultProps = {
    selectedUser: shape({
      id: null,
    }),
  };
  state = {
    filter: '',
    filteredUsers: [],
  };
  handleFilter = ({ target: { value } }) => {
    this.setState(() => ({
      filter: value,
      filteredUsers: this.props.users.filter(({ name, email }) => {
        return (
          ~name.toLowerCase().indexOf(value) ||
          ~email.toLowerCase().indexOf(value)
        );
      }),
    }));
  };
  handleAddContact = () => {
    this.props.selectUser({
      id: null,
      name: '',
      email: '',
    });
  };

  render() {
    const { users, selectUser, deleteUser } = this.props;
    return (
      <Fragment>
        <h1>My address book</h1>
        <div style={styles.search}>
          <Search action={this.handleFilter} value={this.state.filter} />
        </div>
        {users && (
          <List
            users={
              !!this.state.filteredUsers.length
                ? this.state.filteredUsers
                : users
            }
            selectUser={selectUser}
            deleteUser={deleteUser}
          />
        )}
        <div style={styles.addContact} onClick={this.handleAddContact}>
          +
        </div>
      </Fragment>
    );
  }
}

export default connect(selectors, actions)(contactsList);
