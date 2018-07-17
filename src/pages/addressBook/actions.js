import * as types from './constants';

export const getUsers = () => ({
  types: [
    types.LOAD_USERS_REQUEST,
    types.LOAD_USERS_SUCCESS,
    types.LOAD_USERS_FAILURE,
  ],
  promise: api =>
    api({
      url: 'https://next.json-generator.com/api/json/get/Ny2lMpH7B',
      method: 'GET',
    }),
});

export const selectUser = user => ({
  type: types.SELECT_USER,
  user,
});

export const deleteUser = userId => ({
  type: types.DELETE_USER,
  userId,
});

export const editUser = user => ({
  type: !user.id ? types.CREATE_USER : types.EDIT_USER,
  user,
});
