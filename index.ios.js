/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, NavigatorIOS } from 'react-native'
import configureStore from './configureStore'
import Root from './Root'
import bugsnag from './App/utils/bugsnag'
import CodePush from 'react-native-code-push'

const store = configureStore()

class Atdaa extends Component {
  render() {
    //this.client.notify(new Error('Test Error'));
    return <Root store={store}/>
  }
}

Atdaa = CodePush(Atdaa)

export default Atdaa

AppRegistry.registerComponent('Atdaa', () => Atdaa);
