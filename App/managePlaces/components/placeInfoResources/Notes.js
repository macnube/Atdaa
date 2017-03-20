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
        <Text style={styles.headerText}>Notes</Text>
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
    marginHorizontal: 12,
    marginBottom: 25
  },
  headerContainer: {
    height: 20,
    width: 40,
    marginLeft: 20
  },
  headerText: {
    color: 'rgb(156,156,156)',
    fontSize: 13,
    fontWeight: 'bold'
  },
  textInput: {
    minHeight: 100,
    color: 'rgb(178,178,178)',
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(230,230,230)',
    paddingHorizontal: 15,
    paddingVertical: 10
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