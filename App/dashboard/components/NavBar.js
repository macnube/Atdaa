import React from 'react'

import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native'

import NavBarIcon from './NavBarIcon'
import * as colors from '../../resources/Colors'

const NavBar = ({ selectedTab, setSelectedTab, layoutInfo, isVisible, handleLogout }) => {
  const height = isVisible ? 66 : 0
  const backButton = selectedTab === 'placeSearch'
    ? (
      <TouchableHighlight
        onPress={() => setSelectedTab('map')}>
        <View style={styles.nav}>
          <Image style={styles.back} source={{uri: 'backArrowDark'}} />
        </View>
      </TouchableHighlight>
      )
    : <View style={{width: 50}} />
  const navMargin = selectedTab === 'map' ? 4 : 0
  return (
    <View
      style={[styles.navBar, {height: height, marginBottom: navMargin}]}>
      {backButton}
      <Image source={{uri: 'atdaaOrange'}} style={styles.atdaa} />
      <NavBarIcon
        imageURI='logout'
        selected={selectedTab === 'iconSearch'}
        onPress={() => handleLogout()} />
    </View>
  )
}

NavBar.propTypes = {
  selectedTab: React.PropTypes.string.isRequired,
  setSelectedTab: React.PropTypes.func,
  layoutInfo: React.PropTypes.object.isRequired,
  isVisible: React.PropTypes.bool.isRequired
}

NavBar.defaultProps = {
  isVisible: true,
  selectedTab: 'map'
}

var styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    backgroundColor: 'rgb(255,255,255)',
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
  nav: {
    marginTop: 15,
    width: 60,
    alignItems: 'center'
  },
  back: {
    width: 12,
    height: 22
  }
})

export default NavBar
