import React from 'React'

import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

const IconSearchNavBar = ({ categoryIcon, width, handlePress, barColor }) => {
  const extraStyle = categoryIcon
  ? {width: width, backgroundColor: barColor}
  : [styles.navBarShadow, {width: width, backgroundColor: barColor, marginBottom: 30}]
  const atdaaURI = categoryIcon ? 'atdaaLight' : 'atdaaOrange'
  const backURI = categoryIcon ? 'backArrowLight' : 'backArrowDark'
  return (
    <View style={[styles.navBar, extraStyle]}>
      <TouchableHighlight
        onPress={() => handlePress()}>
        <View style={styles.nav}>
          <Image style={styles.back} source={{uri: backURI}} />
        </View>
      </TouchableHighlight>
      <Image source={{uri: atdaaURI}} style={styles.atdaa} />
      <View>
        <View style={styles.nav} />
      </View>
    </View>
  )
}

export default IconSearchNavBar

IconSearchNavBar.propTypes = {
  categoryIcon: React.PropTypes.object,
  width: React.PropTypes.number.isRequired,
  handlePress: React.PropTypes.func.isRequired,
  barColor: React.PropTypes.string.isRequired
}

IconSearchNavBar.defaultProps = {
  categoryIcon: null,
  barColor: 'rgb(255,255,255)'
}

var styles = StyleSheet.create({
  navBar: {
    height: 66,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navBarShadow: {
    shadowColor: 'rgb(203,203,203)',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    shadowOpacity: 1
  },
  atdaa: {
    height: 24,
    width: 58,
    marginTop: 15
  },
  back: {
    width: 12,
    height: 22
  },
  search: {
    height: 17,
    width: 17
  },
  nav: {
    marginTop: 15,
    width: 60,
    alignItems: 'center'
  }
})
