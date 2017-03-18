import React, { Component } from 'react'

import {
  Modal,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import CodePush from 'react-native-code-push'

const ConfirmModal = (props) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.closeModal()
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{props.text}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image source={{uri: props.uri}} style={styles.icon} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.buttonNo}
                onPress={() => {
                  CodePush.sync()
                  console.log('Just attempted CodePush.sync')
                  props.close()
                }}>
                <Text style={styles.buttonNoText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.buttonYes}
                onPress={() => props.onYes()}>
                <Text style={styles.buttonYesText}>{props.yesText}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ConfirmModal

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.75)'
  },
  modal: {
    backgroundColor: 'rgb(250,250,250)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 194,
    width: 248,
    borderRadius: 7
  },
  textContainer: {
    marginTop: 22,
    width: 178,
  },
  text: {
    fontSize: 15,
    color: 'rgb(110,110,110)',
    textAlign: 'center',
    lineHeight: 19
  },
  iconContainer: {
    marginTop: -1,
  },
  icon: {
    height: 49,
    width: 49
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgb(227,227,227)'
  },
  buttonYes: {
    width: 124,
    height: 42
  },
  buttonNo: {
    width: 124,
    height: 42,
    borderRightWidth: 1,
    borderColor: 'rgb(227,227,227)'
  },
  buttonYesText: {
    fontSize: 15,
    marginTop: 13,
    color: 'rgb(255,113,113)',
    textAlign: 'center',
  },
  buttonNoText: {
    fontSize: 15,
    marginTop: 13,
    color: 'rgb(110,110,110)',
    textAlign: 'center',
  }
})
//FF7171 255 113 113
