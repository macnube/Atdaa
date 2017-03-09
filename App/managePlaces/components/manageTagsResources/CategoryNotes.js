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
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Notes</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref='note'
            style={[styles.textInput, {height: Math.max(30, this.props.noteHeight)}]}
            editable={true}
            multiline={true}
            value={this.props.notes || ''}
            onChangeText={(text) => this.props.handleNotesChange(text)}
            onContentSizeChange={(event) => this.props.handleNoteSizeChange(event.nativeEvent.contentSize.height)}
            placeholder='No notes...Click to edit' />
        </View>
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
    padding: 5
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: 'white',
  }
})