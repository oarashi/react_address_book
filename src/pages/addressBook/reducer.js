import { combineReducers } from 'redux';
import * as types from './constants';

const initialState = {
    users: [],
    selectedUser: null,
};

export default combineReducers({
    users(state = initialState.users, action) {
        switch (action.type) {
            case types.LOAD_USERS_SUCCESS:
                return action.result.users;
            case types.LOAD_USERS_FAILURE:
                return [];
            case types.DELETE_USER:
                return state.filter(item => item.id !== action.userId);
            case types.EDIT_USER:
                return state.map(item => {
                    return item.id === action.user.id ? action.user : item});
            case types.CREATE_USER:
                return [...state, {...action.user, id: `${state.length}`}];
            default:
                return state;
        }
    },
    selectedUser(state = initialState.selectedUser, action) {
        switch (action.type) {
            case types.SELECT_USER:
                return action.user;
            case types.DELETE_USER:
                return state && action.userId === state.id ? null : state;
            case types.EDIT_USER:
            case types.CREATE_USER:
                return null;
            default:
                return state;
        }
    }
})
