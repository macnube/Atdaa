import React from 'react'

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native'

import * as colors from '../../resources/Colors'

import Icon from '../../shared/Icon'

const MapMarker = ({ selected, place, showName }) => {
  const scoreSize = selected ? styles.selectedScoreSize : styles.scoreSize
  var icon = {...place.primaryIcon}
  var shadow = place.score === 0 && !selected ? false : true
  if (place.score === 0 && selected) icon.imageURI += '_inactive'
  else if (place.score === 0) icon.imageURI += '_clean_inactive'
  else icon.imageURI = place.mapIcon.imageURI
  var iconHeight
  if (selected) iconHeight = 43
  else if (place.score === 1) iconHeight = showName ? 25 : 23
  else if (place.score === 2) iconHeight = showName ? 30 : 28
  else if (place.score === 3) iconHeight = showName ? 31 : 33
  else if (place.score === 4) iconHeight = showName ? 33 : 35
  else iconHeight = 18
  const textStyle = selected ? styles.selectedText : styles.text
  const score = place.score > 1
    ? (
      <View style={[styles.scoreStyle, scoreSize]}>
        <Text style={textStyle}>{place.score}</Text>
      </View>
    )
    : <View />
  const name = (place.score > 0 && showName)
    ? <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
    : <View style={{width: 5}} />
  return (
    <View style={styles.container}>
      <View>
        <Icon shadow={shadow} style={{height: iconHeight}} icon={icon} />
        {score}
      </View>
      {name}
    </View>
  )
}

export default MapMarker

var styles = StyleSheet.create({
  container: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  iconContainer: {
    height: 55,
    width: 55
  },
  selectedMarker: {
    height: 43,
    width: 43,
    borderRadius: 20,
    zIndex: 10
  },
  scoreSize: {
    height: 12,
    width: 12
  },
  selectedScoreSize: {
    height: 15,
    width: 15
  },
  selectedText: {
    fontSize: 9,
    color: 'white'
  },
  text: {
    fontSize: 7,
    color: 'white'
  },
  scoreStyle: {
    position: 'absolute',
    top: -2,
    right: -3,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: colors.activeIcon,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeName: {
    fontSize: 10,
    marginLeft: 3,
    width: 80
  },
  shadow: {
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.25
  }
})
