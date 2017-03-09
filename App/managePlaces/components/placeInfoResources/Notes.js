import React from 'react'

import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

const Notes = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Notes</Text>
      </View>
      <TextInput
        style={styles.textInput}
        editable={true}
        multiline={true}
        value={props.notes || ''}
        onChangeText={(text) => props.handleNotesChange(text)}
        onEndEditing={props.handleSaveNotes}
        onFocus={() => console.log('clicking on notes!!!!')}
        placeholder='No notes...Touch to edit, touch away to save' />
    </View>
  )
}

export default Notes

/*
      <TouchableHighlight
        style={styles.editButton}
        onPress={props.handleEditNotes}>
        <Text style={styles.editText}>{edit}</Text>
      </TouchableHighlight>
*/

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 30,
    marginBottom: 50
  },
  headerContainer: {
    height: 30,
    width: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  textInput: {
    height: 50
  },
  editButton: {
    alignSelf: 'flex-end',
    height: 14,
  },
  editText: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgb(129, 187, 255)'
  }
})