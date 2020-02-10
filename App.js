import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './screens/mainScreen';
import PhotoScreen from './screens/photoScreen';


const AppNavigator = createStackNavigator({
  Home: { screen: MainScreen },
  Photo: { screen: PhotoScreen },
});

const App=createAppContainer(AppNavigator);
export default App;
