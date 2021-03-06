import React, { Component } from 'react';
import { Provider } from 'react-redux';
import getStore from 'redux/store';
import AddressBook from 'pages/addressBook'
import './App.css';

const store = getStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <AddressBook/>
                </div>
            </Provider>
        );
    }
}

export default App;
