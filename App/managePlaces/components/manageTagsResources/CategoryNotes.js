import React, { Component } from 'react'

import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

class CategoryNotes extends Component {

  render () {
    const saveNote = this.props.editNotes
  ? (
    <TouchableHighlight
      style={styles.editButton}
      onPress={() => {
        this.refs.note.blur()
        this.props.handleSaveNotes()
      }}>
      <Text style={styles.editText}>Save Note</Text>
    </TouchableHighlight>
    )
  : <View />
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Notes</Text>
        </View>
        <TextInput
          ref='note'
          style={styles.textInput}
          editable={true}
          multiline={true}
          value={this.props.notes || ''}
          onChangeText={(text) => this.props.handleNotesChange(text)}
          onFocus={() => {
            console.log('focused!')
            this.props.handleEditNotes()
          }}
          placeholder='No notes...Click to edit' />
        {saveNote}
      </View>
    )
  }
}

export default CategoryNotes

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 30,
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
    alignItems: 'center',
    height: 40,
    width: 50
  },
  editText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'rgb(129, 187, 255)'
  }
})