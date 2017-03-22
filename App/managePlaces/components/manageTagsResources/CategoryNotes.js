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
          <Text style={styles.headerText}>Notes</Text>
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
            placeholder='Tap to edit your notes' />
        </View>
      </View>
    )
  }
}

export default CategoryNotes

var styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 30
  },
  headerText: {
    color: 'rgb(156,156,156)',
    fontSize: 13,
    fontWeight: 'bold'
  },
  headerContainer: {
    height: 30,
    width: 40,
    justifyContent: 'center',
  },
  textInput: {
    padding: 5,
    fontSize: 15,
    color: 'rgb(178,178,178)',
    minHeight: 140
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    minHeight: 150
  }
})