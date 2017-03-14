import React from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'

const CreateAccount = (props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={styles.atdaaOrange} />
      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.plainText}>Create Account</Text>
        </View>
        <FacebookButton
          onLogin={props.onFacebookCreateAccount}
          onLogout={props.onFacebookLogout}
          user={null}
          isLoading={props.isLoading} />
        <View style={styles.textContainer}>
          <Text style={styles.plainText}>OR</Text>
        </View>
        <EmailButton handlePress={() => props.toCreateEmail()} />
      </View>
      <Text style={styles.errorMessage}>{props.error}</Text>
      <TouchableOpacity
        onPress={props.toLogIn}>
        <Text>I already have an account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateAccount

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  atdaaOrange: {
    marginTop: 100,
    width: 137,
    height: 56
  },
  buttonContainer: {
    height: 200,
    marginTop: 50,
    justifyContent: 'space-between',
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
