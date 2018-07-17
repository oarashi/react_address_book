import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserModal from './userModal';
import ConstactsList from './contactsList';
import selectors from './selectors';
import * as actions from './actions';

const { arrayOf, shape, string } = PropTypes;

const styles = {
  mainContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
};
class addressBook extends PureComponent {
  static propTypes = {
    users: arrayOf(
      shape({
        name: string.isRequired,
        email: string.isRequired,
        id: string.isRequired,
      }),
    ),
  };
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { selectedUser } = this.props;
    return (
      <div style={styles.mainContainer}>
        {selectedUser ? <UserModal /> : <ConstactsList />}
      </div>
    );
  }
}

export default connect(selectors, actions)(addressBook);
