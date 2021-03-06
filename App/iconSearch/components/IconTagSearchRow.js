import React from 'React'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

const IconTagSearchRow = ({ layoutInfo, icon, handleNewIcon, handleUpdateToolbar }) => {
  let name = icon.name
  if (icon.type === 'category') {
    name = 'No Preference'
  }
  const textColor = icon.selected ? icon.iconColor : 'rgb(74,74,74)'
  const borderLeftColumn = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(216,216,216)'
  }
  const borderRightColumn = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(216,216,216)'
  }
  var borderStyle
  if (icon.index % 2 === 0) {
    borderStyle = borderLeftColumn
  } else borderStyle = borderRightColumn
  var tag = (
    <TouchableOpacity
      onPress={() => handleUpdateToolbar(icon)}
      style={[styles.container, borderStyle]}
      >
      <Text style={[styles.tagText, {color: textColor}]}>{name}</Text>
    </TouchableOpacity>
  )
  var placeHolder = <View style={[styles.container, borderStyle]} />
  return icon['type'] === 'placeHolder' ? placeHolder : tag
}

export default IconTagSearchRow

IconTagSearchRow.propTypes = {
  layoutInfo: React.PropTypes.object.isRequired,
  icon: React.PropTypes.object.isRequired
}

var styles = StyleSheet.create({
  container: {
    height: 63,
    width: 142,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tagText: {
    fontSize: 14,
    width: 100,
    letterSpacing: 0.3,
    lineHeight: 20,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  tagContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgb(255,255,255)',
    borderWidth: 2,
    borderColor: 'rgb(213,213,213)'
  }
})
