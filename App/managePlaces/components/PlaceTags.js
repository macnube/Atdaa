import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import { getIconById } from '../../utils/helpers'

import PlaceTagsRow from './placeTagsResources/PlaceTagsRow'
import PlaceNotesRow from './placeTagsResources/PlaceNotesRow'

const PlaceTags = (props) => {
  const tags = props.placeCategories.map((data, index) => {
    const icon = getIconById(data.category)
    var categoryNotes = props.categoryNotes || {}
    if (icon.id in categoryNotes) {
      return (
        <PlaceNotesRow
          icon={icon}
          handleEditCategory={props.handleEditCategory}
          note={props.categoryNotes[icon.id]}
          key={index} />
      )
    } else {
      const categoryTags = data.tags.map((tag) => getIconById(tag))
      return (
        <PlaceTagsRow
          icon={icon}
          tags={categoryTags}
          handleEditCategory={props.handleEditCategory}
          key={index} />
      )
    }
  })
  console.log('props going into PlaceTags', props)
  return (
    <View style={styles.container}>
      {tags}
    </View>
  )
}

export default PlaceTags

PlaceTags.propTypes = {
  placeCategories: React.PropTypes.array.isRequired,
  categoryNotes: React.PropTypes.object
}



var styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(238,238,238)',
    marginHorizontal: 30,
    flex: 1
  }
})
