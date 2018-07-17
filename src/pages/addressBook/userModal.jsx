import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectors from './selectors';
import * as actions from './actions';

const { arrayOf, shape, string } = PropTypes;

const BTN_STATUS = {
  submit: '#008000',
  delete: '#FF0000',
  cancel: '#FFF',
};

const styles = {
  input: {
    width: '70%',
    margin: '10px 0',
    padding: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btn: (status = 'cancel') => ({
    backgroundColor: BTN_STATUS[status],
    color: status === 'cancel' ? '#000' : '#FFF',
  }),
};

class UserModal extends PureComponent {
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
  constructor(props) {
    super(props);
    this.state = {
      id: props.selectedUser.id || null,
      name: props.selectedUser.name || '',
      email: props.selectedUser.email || '',
    };
  }

  validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.state.email);
  };

  handleDelete = () => this.props.deleteUser(this.state.id);

  handleEdit = ({ target: { name, value } }) =>
    this.setState(() => ({ [name]: value }));

  handleSubmit = () => {
    this.validateEmail() ? this.props.editUser({ ...this.state }) : alert('Invalid email format');
  };

  handleCancel = () => this.props.selectUser(null);

  render() {
    const pageType = !this.state.id ? 'New contact' : 'Edit contact';
    return (
      <div>
        <div>
          <h2>
            My address book / {pageType}
          </h2>
          <div>
            <input
              style={styles.input}
              placeholder="name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleEdit}
            />
          </div>
          <div>
            <input
              style={styles.input}
              placeholder="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleEdit}
            />
          </div>
        </div>
        <div style={styles.buttonContainer}>
          {this.state.id ? (
            <div
              className="button"
              style={styles.btn('delete')}
              onClick={this.handleDelete}
            >
              Delete
            </div>
          ) : (
            <div />
          )}
          <div style={styles.buttonContainer}>
            <div
              className="button"
              style={styles.btn()}
              onClick={this.handleCancel}
            >
              Cancel
            </div>
            <div
              className="button"
              style={styles.btn('submit')}
              onClick={this.handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(selectors, actions)(UserModal);
