import React from 'react'

import {
  View,
  Image,  
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

const Address = (props) => {
  const width = Dimensions.get('window').width
  // Additional 4 for elipsis
  const containerWidth = width - 78
  return (
    <View style={[styles.container, {width: containerWidth - 15}]}>
      <Image source={{uri: 'address'}} style={styles.image} />
      <Text style={styles.text} numberOfLines={1}>{props.address}</Text>
    </View>
  )
}

export default Address;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
  },
  image: {
    width: 17,
    height: 20,
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
    color: 'rgb(156,156,156)'
  }
})