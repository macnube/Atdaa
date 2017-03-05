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
        onBack={props.onBack}
        placeInfo={props.placeInfo} />
      <View style={styles.textContainer}>
        <Text>What did you like from the menu?</Text>
        <Text>Please add it to the notes below:</Text>
      </View>
      <CategoryNotes
        editNotes={props.editNotes}
        handleEditNotes={props.handleEditNotes}
        handleNotesChange={props.handleNotesChange}
        handleSaveNotes={props.handleSaveNotes}
        notes={props.notes} />
      <View style={{height: 50}} />
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
