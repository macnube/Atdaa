import React from 'React'

import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

const PlaceInfoNavBar = (props) => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.02)']}
      start={{x: 0.5, y: 0.4}}
      end={{x: 0.5, y: 1.0}}
      style={styles.navBar}>
      <TouchableHighlight
        onPress={() => props.handleToMap()}>
        <View style={[styles.nav, {top: props.keyboardHeight}]}>
          <Image style={styles.back} source={{uri: 'backArrowLight'}} />
        </View>
      </TouchableHighlight>
    </LinearGradient>
  )
}

export default PlaceInfoNavBar

PlaceInfoNavBar.propTypes = {
  handleToMap: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    height: 66,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    shadowColor: 'rgb(0,0,0)',
    shadowOpacity: .25,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2
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
  }
});