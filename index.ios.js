/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, NavigatorIOS } from 'react-native';
import configureStore from './configureStore';
import Root from './Root';
import bugsnag from './App/utils/bugsnag'

const store = configureStore();

export default class Atdaa extends Component {

  constructor(props){
    super(props);
  }

  render() {
    //this.client.notify(new Error('Test Error'));
    return <Root store={store}/>
  }
}

AppRegistry.registerComponent('Atdaa', () => Atdaa);
