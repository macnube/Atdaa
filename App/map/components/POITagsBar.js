import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import Icon from '../../shared/Icon'

const POITagsBar = (props) => {
  var tags
  console.log('props going into POITagsBar', props)
  if (props.cardIcons.length > 0) {
    tags = props.cardIcons.map((icon, index) => {
      var smallIcon = {...icon, imageURI: icon.imageURI + 'Clean'}
      return <View key={index} style={{marginLeft: 5}}><Icon icon={smallIcon} style={{height: 20}} /></View>
    })
  } else {
    tags = <View />
  }
  return (
    <View style={styles.container}>
      {tags}
    </View>
  )
}

export default POITagsBar

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 2,
    justifyContent: 'space-between'
  }
})
