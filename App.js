import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from './screens/mainScreen';
import PhotoScreen from './screens/photoScreen';


const App = StackNavigator({
  Home: { screen: MainScreen },
  Photo: { screen: PhotoScreen },
});

export default App;