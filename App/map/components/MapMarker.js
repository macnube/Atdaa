import React from 'react'

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native'

import * as colors from '../../resources/Colors'

const MapMarker = ({ selected, place, showName }) => {
  const scoreSize = selected ? styles.selectedScoreSize : styles.scoreSize
  var uri
  if (place.score === 0 && selected) uri = place.primaryIcon.imageURI + '_inactive'
  else if (place.score === 0) uri = place.primaryIcon.imageURI + '_clean_inactive'
  else uri = place.mapIcon.imageURI
  var markerStyle
  if (selected) {
    markerStyle = [styles.selectedMarker, styles.shadow]
  } else if (place.score === 1) {
    markerStyle = showName ? styles.markerOneBig : styles.markerOne
    markerStyle = [markerStyle, styles.shadow]
  } else if (place.score === 2) {
    markerStyle = showName ? styles.markerTwoBig : styles.markerTwo
    markerStyle = [markerStyle, styles.shadow]
  } else if (place.score === 3) {
    markerStyle = showName ? styles.markerThreeBig : styles.markerThree
    markerStyle = [markerStyle, styles.shadow]
  } else if (place.score === 4) {
    markerStyle = showName ? styles.markerFourBig : styles.markerFour
    markerStyle = [markerStyle, styles.shadow]
  } else {
    markerStyle = styles.markerInactive
  }
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
      <View style={markerStyle}>
        <Image source={{uri: uri}} style={{flex: 1}} resizeMode='contain' />
        {score}
      </View>
      {name}
    </View>
  )
}

export default MapMarker

var styles = StyleSheet.create({
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
  markerInactive: {
    height: 18,
    width: 18
  },
  markerOne: {
    height: 23,
    width: 23,
    borderRadius: 10
  },
  markerOneBig: {
    height: 25,
    width: 25,
    borderRadius: 13
  },
  markerTwo: {
    height: 28,
    width: 28,
    borderRadius: 11
  },
  markerTwoBig: {
    height: 30,
    width: 30,
    borderRadius: 14
  },
  markerThree: {
    height: 31,
    width: 31,
    borderRadius: 12
  },
  markerThreeBig: {
    height: 33,
    width: 33,
    borderRadius: 15
  },
  markerFour: {
    height: 33,
    width: 33,
    borderRadius: 13
  },
  markerFourBig: {
    height: 35,
    width: 35,
    borderRadius: 16
  },
  container: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
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
