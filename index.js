import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store=createStore(rootReducer, applyMiddleware(thunk));

class RNRedux extends React.Component{
    render(){
        return(
        <Provider store = { store }>
            <App />
        </Provider>
        )
    }
}
AppRegistry.registerComponent(appName, () => RNRedux);
