import React, { Component } from 'react'

import { FBLoginManager } from 'react-native-facebook-login'

import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native'

class FacebookButton extends Component {

  constructor (props) {
    super(props)
    console.log('props going into FacebookButton', props)
  }

  handleLogin () {
    FBLoginManager.login((error, data) => {
      if (!error) {
        console.log('Facebook login successful')
        this.props.onLogin(data)
      } else {
        console.log(error, data)
      }
    })
  }

  handleLogout () {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        this.props.onLogout()
      } else {
        console.log(error, data)
      }
    })
  }

  handlePress () {
    this.props.user
      ? this.handleLogout()
      : this.handleLogin()
  }

  componentWillMount () {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        this.props.onLogout()
      } else {
        console.log(error, data)
      }
    })
  }

  render () {
    var text = this.props.isLoading ? 'Logging in...' : 'Facebook'
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this.handlePress.bind(this)}
        disabled={this.props.isLoading} >
        <Image style={styles.FBLogo} source={{uri: 'facebook'}} />
        <Text style={[styles.FBLoginButtonText, this.props.user ? styles.FBLoginButtonTextLoggedIn : styles.FBLoginButtonTextLoggedOut]}
          numberOfLines={1}>{text}</Text>
      </TouchableOpacity>
    )
  }

}

export default FacebookButton

var styles = StyleSheet.create({
  buttonContainer: {
    height: 44,
    width: 219,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgb(66,93,174)',
    borderRadius: 5,
    paddingHorizontal: 30
  },
  FBLoginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 14.2
  },
  FBLoginButtonTextLoggedIn: {
    marginLeft: 5
  },
  FBLoginButtonTextLoggedOut: {
    marginLeft: 18
  },
  FBLogo: {
    height: 16,
    width: 16
  }
})
