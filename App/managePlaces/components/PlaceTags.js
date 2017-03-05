import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import { getIconById } from '../../utils/helpers'

import PlaceTagsRow from './placeTagsResources/PlaceTagsRow'

const PlaceTags = (props) => {
  const tags = props.placeCategories.map((data, index) => {
    const icon = getIconById(data.category)
    console.log('Cateogry Icon from PlaceTags', icon)
    const tags = data.tags.map((tag) => getIconById(tag))
    return <PlaceTagsRow icon={icon} tags={tags} key={index} />
  })
  console.log('props going into PlaceTags', props)
  return (
    <View style={styles.container}>
      {tags}
    </View>
  )
}

export default PlaceTags

var styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(238,238,238)',
    marginHorizontal: 30,
    flex: 1
  }
})
