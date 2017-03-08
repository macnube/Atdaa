import React from 'React'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import Icon from '../../../shared/Icon'

const PlaceNotesRow = (props) => {
  console.log('Props from PlaceNotesRow', props)
  return (
    <TouchableOpacity
      onPress={() => props.handleEditCategory(props.icon)}
      activeOpacity={1}>
      <View style={styles.container}>
        <Icon style={{height: 26}} icon={{...props.icon, imageURI: props.icon.imageURI+'Clean'}} shadow={false} />
        <View style={styles.textContainer}>
          <Text style={styles.noteText}>{props.note}</Text>
        </View>
      </View>
    </TouchableOpacity>

  )
}

export default PlaceNotesRow



var styles = StyleSheet.create({
  container: {
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgb(238,238,238)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    marginLeft: 20,
  },
  noteText: {
    fontSize: 12
  }
})
