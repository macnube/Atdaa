import React from 'React'

import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text
} from 'react-native'

import HeaderTags from './HeaderTags'
import CategoryNotes from './CategoryNotes'

const ManageCategoryNote = (props) => {
  const instructions = !props.keyboard
  ? (
    <View style={styles.textContainer}>
      <Text>What did you like from the menu?</Text>
      <Text>Please add it to the notes above</Text>
    </View>
  )
  : <View />
  return (
    <View
      style={styles.container}>
      <HeaderTags
        layoutInfo={props.layoutInfo}
        icon={props.icon}
        onBack={props.handleSaveNotes}
        placeInfo={props.placeInfo}
        marginBottom={10} />
      <CategoryNotes
        handleNotesChange={props.handleNotesChange}
        handleSaveNotes={props.handleSaveNotes}
        handleNoteSizeChange={props.handleNoteSizeChange}
        notes={props.notes}
        noteHeight={props.noteHeight} />
      {instructions}
    </View>
  )
}

export default ManageCategoryNote

var styles = StyleSheet.create({
  container: {
  },
  textContainer: {
    alignSelf: 'center',
    marginTop: 10
  }
})
