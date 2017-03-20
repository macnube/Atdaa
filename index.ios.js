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
import Config from 'react-native-config'
import CodePush from 'react-native-code-push'

const store = configureStore()

class Atdaa extends Component {
  render() {
    return <Root store={store}/>
  }
}

var codePushOptions

if (Config.CODEPUSH_SYNC_VISIBLE === 'true') {
	codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL }
} else {
	codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_APP_START }
}


Atdaa = CodePush(codePushOptions)(Atdaa)

AppRegistry.registerComponent('Atdaa', () => Atdaa)
