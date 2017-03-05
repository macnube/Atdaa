import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

import TagsSelectedBar from './TagsSelectedBar'
import FooterAddMore from './FooterAddMore'
import FooterCancel from './FooterCancel'
import FooterDone from './FooterDone'

const ManageTagsFooter = (props) => {
  console.log("props from ManageTagsFooter", props);

  const doneVisible = props.selectedTags.length > 0
  const addMoreVisible = props.categoryIcon ? true : false

  return (
    <View style={styles.container}>
      <TagsSelectedBar selectedTags={props.selectedTags} />
    </View>
  )
}

/*
      <View style={styles.submitContainer}>
        <FooterCancel 
          handlePress={props.handleBackToPlaceInfo} />
        <FooterAddMore 
          visible={addMoreVisible} 
          handlePress={props.handleBackToCategory} />
        <FooterDone 
          visible={doneVisible} 
          handlePress={props.handleAddPlace} />
      </View>
*/

export default ManageTagsFooter;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  submitContainer: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 20
  }
})