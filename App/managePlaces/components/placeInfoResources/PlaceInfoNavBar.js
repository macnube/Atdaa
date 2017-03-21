import React from 'React'

import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Text
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

const PlaceInfoNavBar = (props) => {
  const textColor = props.placeInfo.isNew ? 'rgb(120,120,120)' : 'white'
  const mainInfoColor = props.placeInfo.isNew ? 'rgb(240, 240, 240)' : props.icon.iconColor
  const solid = (
    <View style={[styles.mainContainer, {top: props.keyboardHeight}]}>
      <View style={[styles.mainInfo, {backgroundColor: mainInfoColor}]}>
        <TouchableHighlight
          onPress={() => props.handleToMap()}>
          <View style={[styles.nav]}>
            <Image style={[styles.back, {marginTop: 0}]} source={{uri: 'backArrowLight'}} />
          </View>
        </TouchableHighlight>
        <View style={styles.textContainer} >
          <Text style={[styles.nameText, {color: textColor}]} numberOfLines={1}>{props.placeInfo.name}</Text>
          <Text style={[styles.typeText, {color: textColor}]}>{props.placeInfo.type}</Text>
        </View>
        <View style={styles.nav} />
      </View>
    </View>
  )
  const normal = (
    <LinearGradient
      colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.02)']}
      locations={[0.4, 1.0]}
      style={styles.navBar}>
      <TouchableHighlight
        onPress={() => props.handleToMap()}>
        <View style={[styles.nav, {top: props.keyboardHeight}]}>
          <Image style={styles.back} source={{uri: 'backArrowLight'}} />
        </View>
      </TouchableHighlight>
    </LinearGradient>
  )

  return props.navSolid || props.keyboardHeight > 0 ? solid : normal
}

export default PlaceInfoNavBar

PlaceInfoNavBar.propTypes = {
  handleToMap: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    height: 90,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    shadowColor: 'rgb(0,0,0)',
    shadowOpacity: .25,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2
  },
  mainContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    alignItems: 'stretch',
    shadowColor: 'rgb(0,0,0)',
    shadowOpacity: .25,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    backgroundColor: 'transparent'
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
  },
  textContainer: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: 70,
    paddingBottom: 15,
    paddingTop: 20
  },
  nameText: {
    fontSize: 20,
    color: 'rgb(120,120,120)'
  },
  typeText: {
    color: 'rgb(120,120,120)',
    fontSize: 14
  },
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 75,
    backgroundColor: 'transparent',
  },
  filler: {
    width: 58
  },
  search: {
    height: 18,
    width: 18
  },
  back: {
    height: 22,
    width: 13,
    marginTop: 15,
  },
  nav: {
    width: 60,
    alignItems: 'center',
  },
  navFill: {
    backgroundColor: 'transparent'
  }
});