import { combineReducers } from 'redux';

import addressBook from 'pages/addressBook/reducer';

const rootReducer = combineReducers({
    addressBook,
});

export default rootReducer;
