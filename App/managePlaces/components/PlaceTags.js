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
    marginHorizontal: 18,
    marginTop: 7,
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(230,230,230)',
    flex: 1
  }
})
