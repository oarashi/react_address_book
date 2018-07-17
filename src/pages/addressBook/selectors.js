import { createStructuredSelector } from 'reselect';

import REDUCER from './constants';

const users = state => state[REDUCER].users;
const selectedUser = state => state[REDUCER].selectedUser;

export default createStructuredSelector({
  users,
  selectedUser,
});
