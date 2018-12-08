import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './src/Main';
import ImageScreen from './src/ImageScreen';

export default class App extends Component {
  render() {
    const MainNavigator = createStackNavigator({
      Main: { screen: Main },
      ImageScreen: { screen: ImageScreen },
    });
    const AppContainer = createAppContainer(MainNavigator);
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
