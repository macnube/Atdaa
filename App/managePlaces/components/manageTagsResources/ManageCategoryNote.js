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
  var margin = 0
  return (
    <KeyboardAvoidingView
      style={[styles.container, {marginTop: margin}]}
      behavior='position'
      onKeyboardChange={() => console.log('keyboard open/close')} >
      <HeaderTags
        layoutInfo={props.layoutInfo}
        icon={props.icon}
        onBack={props.handleSaveNotes}
        placeInfo={props.placeInfo} />
      <View style={styles.textContainer}>
        <Text>What did you like from the menu?</Text>
        <Text>Please add it to the notes below:</Text>
      </View>
      <CategoryNotes
        handleNotesChange={props.handleNotesChange}
        handleSaveNotes={props.handleSaveNotes}
        handleNoteSizeChange={props.handleNoteSizeChange}
        notes={props.notes}
        noteHeight={props.noteHeight} />
    </KeyboardAvoidingView>
  )
}

export default ManageCategoryNote

var styles = StyleSheet.create({
  container: {
  },
  textContainer: {
    alignSelf: 'center'
  }
})
