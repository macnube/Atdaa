import React from 'React'

import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Text
} from 'react-native'

const ManageTagsNavBar = ({ categoryIcon, width, placeInfo, handlePress, barColor }) => {
  const extraStyle = categoryIcon
    ? {width: width, backgroundColor: barColor}
    : [styles.navBarShadow, {width: width, backgroundColor: barColor, marginBottom: 30}]
  const backURI = categoryIcon ? 'backArrowLight' : 'backArrowDark'
  const navTextColor = categoryIcon ? 'white' : 'rgb(135,135,135)'
  const title = categoryIcon
    ? <View />
    : <Text numberOfLines={2} style={[styles.navText, {color: navTextColor}]}>Editing {placeInfo.name}</Text>
  return (
    <View style={[styles.navBar, extraStyle]}>
      <TouchableHighlight
        onPress={() => handlePress()}>
        <View style={styles.nav}>
          <Image style={styles.back} source={{uri: backURI}} />
          <Text style={[styles.doneText, {color: navTextColor}]}>Done</Text>
        </View>
      </TouchableHighlight>
      {title}
      <View>
        <View style={styles.nav} />
      </View>
    </View>
  )
}

export default ManageTagsNavBar

ManageTagsNavBar.propTypes = {
  categoryIcon: React.PropTypes.object,
  width: React.PropTypes.number.isRequired,
  handlePress: React.PropTypes.func.isRequired,
  barColor: React.PropTypes.string.isRequired
}

ManageTagsNavBar.defaultProps = {
  categoryIcon: null,
  barColor: 'rgb(255,255,255)'
}

var styles = StyleSheet.create({
  navBar: {
    minHeight: 66,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
    alignItems: 'center'
  },
  navBarShadow: {
    shadowColor: 'rgb(203,203,203)',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 3,
    shadowOpacity: 1
  },
  navText: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    width: 150,
  },
  doneText: {
    fontSize: 15,
    marginLeft: 5
  },
  back: {
    width: 12,
    height: 22
  },
  search: {
    height: 17,
    width: 17
  },
  atdaa: {
    height: 24,
    width: 58,
    marginTop: 15
  },
  nav: {
    width: 60,
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row'
  }
})
