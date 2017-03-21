import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import Icon from '../../../shared/Icon'

const AddTag = (props) => {
  const icon = {id: 'editTags', imageURI: 'editTags'}
  const text = props.isNew ? 'Add Place' : 'Edit Place'
  const color = props.isNew ? 'rgb(156,156,156)' : props.color
  return (
    <TouchableHighlight
      onPress={() => props.handlePress()}>
      <View style={[styles.container, {borderColor: color}]}>
        <Text style={[styles.text, {color: color}]}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default AddTag

AddTag.propTypes = {
  handlePress: React.PropTypes.func.isRequired
}

var styles = StyleSheet.create({
  container: {
    height: 35,
    width: 125,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(250,250,250)',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  }
})
