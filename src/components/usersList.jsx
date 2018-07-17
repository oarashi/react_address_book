import React from 'react';
import PropTypes from 'prop-types';

const { arrayOf, shape, string, func } = PropTypes;

const styles = {
  container: (even = false) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #000',
    padding: '0 10px',
    ...(even && {
      backgroundColor: '#eee',
    }),
  }),
  userInfo: {
    textAlign: 'left',
  },
  userName: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  deleteButton: {
    cursor: 'pointer',
  },
  line: {
    border: '1px solid #000',
  },
};

const propTypes = {
  users: arrayOf(
    shape({
      name: string.isRequired,
      email: string.isRequired,
      id: string.isRequired,
    }),
  ).isRequired,
  selectUser: func.isRequired,
  deleteUser: func.isRequired,
};

const usersList = ({ users, selectUser, deleteUser }) => {
  const handleSelectUser = user => () => selectUser(user);
  const handleDeleteUser = id => () => deleteUser(id);
  return (
    <div>
      {users.map(({ id, name, email }, index) => (
        <div style={styles.container(!(index % 2))} key={id}>
          <div style={styles.userInfo}>
            <p
              style={styles.userName}
              onClick={handleSelectUser({ id, name, email })}
            >
              {name}
            </p>
            <p>{email}</p>
          </div>
          <div style={styles.deleteButton} onClick={handleDeleteUser(id)}>
            x
          </div>
        </div>
      ))}
    </div>
  );
};

usersList.propTypes = propTypes;

export default usersList;
