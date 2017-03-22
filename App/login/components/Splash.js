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
  return (
    <Image
      source={{uri: 'splashBackground'}}
      resizeMode='cover'
      style={styles.backgroundImage}>
      <View style={styles.brandContainer}>
        <Image source={{uri: 'atdaaLarge'}} resizeMode='contain' style={{flex: 1, width: 204}} />
        <Text style={styles.brandText}>Life is too short</Text>
        <Text style={styles.brandText}>to be bored</Text>
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
    fontSize: 20
  },
  brandContainer: {
    marginTop: 155,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 170
  },
  buttonContainer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 50,
    justifyContent: 'space-between'
  },
  loginButton: {
    width: 222,
    height: 44,
    borderRadius: 3,
    backgroundColor: 'rgba(241,126,2,0.9)',
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
    borderWidth: StyleSheet.hairlineWidth,
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
