import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native'

import { setCardScrollInfo, endCardScroll, setCardId} from '../actions'
import * as colors from '../../resources/Colors'

const MapMarker = ({ selected, place, showName}) => {
  console.log("place going into mapMarker", place)
  const scoreSize = selected ? styles.selectedScoreSize : styles.scoreSize
  const uri = place.score === 0 ? place.primaryIcon.imageURI + '_clean_inactive' : place.mapIcon.imageURI
  var markerStyle;
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
    ) : 
    <View />
  const name = (place.score > 0 && showName)
    ? <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
    : <View style={{width: 5}}/>
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
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 10,
  },
  scoreSize: {
    height: 12, 
    width: 12,
  }, 
  selectedScoreSize: {
    height: 15,
    width: 15,
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
    justifyContent: 'center',
  },
  markerInactive: {
    height: 18,
    width: 18,
  },
  markerOne: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  markerOneBig: {
    height: 24,
    width: 24,
    borderRadius: 13,
  },
  markerTwo: {
    height: 22,
    width: 22,
    borderRadius: 11,
  },
  markerTwoBig: {
    height: 26,
    width: 26,
    borderRadius: 14,
  },
  markerThree: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  markerThreeBig: {
    height: 28,
    width: 28,
    borderRadius: 15,
  },
  markerFour: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
  markerFourBig: {
    height: 30,
    width: 30,
    borderRadius: 16,
  },
  container: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  placeName: {
    fontSize: 10,
    marginLeft: 3,
    width: 80,
  },
  shadow: {
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    shadowOpacity: .25
  }
})