import React from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'

import FacebookButton from './FacebookButton'
import Input from './Input'
import SubmitButton from './SubmitButton'

const Login = (props) => {
  const { email, password, isLoading, error, handleLogIn } = props
  const buttonText = isLoading ? 'Signing in...' : 'Sign In'
  const containerPadding = props.keyboard ? 20 : 70
  const atdaaStyle = props.keyboard ? styles.atdaaOrangeSmall : styles.atdaaOrangeBig
  const buttonMargin = props.keyboard ? 0 : 30
  return (
    <KeyboardAvoidingView
      style={[styles.container, {paddingVertical: containerPadding}]}
      behavior='padding'>
      <Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={atdaaStyle} />
      <Text style={{backgroundColor: 'transparent', color: 'black'}}>{props.downloading}</Text>
      <View style={[styles.buttonContainer, {marginTop: buttonMargin}]}>
        <View style={styles.textContainer}>
          <Text style={[styles.plainText, {top: 0}]}>Login</Text>
        </View>
        <FacebookButton
          onLogin={props.onFacebookLogin}
          onLogout={props.onFacebookLogout}
          user={null}
          isLoading={props.facebookLoading} />
        <View style={styles.textContainer}>
          <Text style={styles.plainText}>OR</Text>
        </View>
        <Input
          value={email}
          imageURI='user'
          placeholder='Email'
          setText={props.setEmail} />
        <Input
          value={password}
          imageURI='lock'
          placeholder='Password'
          setText={props.setPass} />
        <SubmitButton
          text={buttonText}
          active={props.email && props.password}
          handlePress={handleLogIn} />
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  atdaaOrangeBig: {
    width: 137,
    height: 56,
    marginTop: 30,
    zIndex: 10
  },
  atdaaOrangeSmall: {
    width: 116,
    height: 48,
    marginTop: 0,
    zIndex: 10
  },
  buttonContainer: {
    height: 320,
    top: -10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  plainText: {
    fontSize: 14,
    color: 'rgb(155,155,155)',
    textAlign: 'center'
  },
  textContainer: {
    width: 219,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 20
  }
})
