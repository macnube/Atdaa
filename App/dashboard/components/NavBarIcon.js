import React from 'react'

import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

const NavBarIcon = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}>
      <View style={styles.container}>
        <Image style={{flex: 1}} source={{uri: props.imageURI}} resizeMode='contain' />
      </View>
    </TouchableWithoutFeedback>
  )
}

NavBarIcon.propTypes = {
  imageURI: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired
}

var styles = StyleSheet.create({
  container: {
    height: 20,
    width: 50,
    marginTop: 15
  }
})

export default NavBarIcon
