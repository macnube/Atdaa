import React from 'react'

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'

const OpenHours = (props) => {
  const width = Dimensions.get('window').width
  const containerWidth = width - 78
  return (
    <View style={[styles.container, {width: containerWidth - 15}]}>
      <Image source={{uri: 'openHours'}} style={styles.image} />
      <Text style={styles.text}>Today:</Text>
      <ScrollView
        style={styles.scrollContainer}
        horizontal={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={true}>
        <Text style={styles.textHours} numberOfLines={1}>{props.hours}</Text>
      </ScrollView>
    </View>
  )
}

export default OpenHours;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 27,
  },
  scrollContainer: {
    marginLeft: 5
  },
  image: {
    width: 17,
    height: 17,
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
    color: 'rgb(156,156,156)'
  },
  textHours: {
    fontSize: 12,
    color: 'rgb(156,156,156)'
  }
})