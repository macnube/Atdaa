import React from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

const OpenHours = (props) => {
  const width = Dimensions.get('window').width
  const containerWidth = width - 78
  return (
    <View style={[styles.container, {width: containerWidth - 15}]}>
      <Image source={{uri: 'openHours'}} style={styles.image} />
      <Text style={styles.text}>Today</Text>
      <Text style={styles.text} numberOfLines={1}>{props.hours}</Text>
    </View>
  )
}

export default OpenHours;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 32,
  },
  image: {
    width: 17,
    height: 17,
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
    color: 'rgb(156,156,156)'
  }
})