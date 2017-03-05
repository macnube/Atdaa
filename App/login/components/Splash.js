import React from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import * as colors from '../../resources/Colors'

const Splash = (props) => {
  var prompt = props.reading
  ? 'Signing you in...'
  : 'Please sign in'
  return (
    <Image
      source={{uri: 'splashBackground'}}
      resizeMode='cover'
      style={styles.backgroundImage}>
      <View style={styles.brandContainer}>
        <Image source={{uri: 'atdaaLarge'}} resizeMode='contain' style={{flex: 1, width: 204}} />
        <Text style={styles.brandText}>Life is too short to be bored</Text>
        <Text style={{backgroundColor: 'transparent', color: 'white'}}>{prompt}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => props.toLogIn()}
          style={styles.loginButton}
          disabled={props.reading}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.toCreateAccount()}
          style={styles.createButton}
          disabled={props.reading}>
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>

      </View>
    </Image>
  )
}

export default Splash

var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  brandText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    width: 153,
    fontSize: 18
  },
  brandContainer: {
    marginTop: 155,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 170
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 85,
    justifyContent: 'space-between'
  },
  loginButton: {
    width: 222,
    height: 44,
    borderRadius: 3,
    backgroundColor: colors.pumpkinOrange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  },
  createButton: {
    marginTop: 15,
    width: 222,
    height: 44,
    borderRadius: 3,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  }
})
