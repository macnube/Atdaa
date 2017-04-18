import React from 'react'

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  KeyboardAvoidingView
} from 'react-native'

import PlaceDetails from './placeInfoResources/PlaceDetails'
import PlaceInfoNavBar from './placeInfoResources/PlaceInfoNavBar'
import PlaceTagsContainer from './PlaceTagsContainer'
import Notes from './placeInfoResources/Notes'
import map from '../../map'

const { MapContainer } = map

const PlaceInfo = (props) => {
  var map, tags, icon
  map = props.placeInfo.isNew
    ? (
      <View style={styles.mapContainer}>
        <MapContainer
          showGPS={false}
          scrollEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          searchMarker={props.placeInfo} />
      </View>
      )
    : <View />
  tags = props.placeInfo.isNew
    ? <View />
    : <PlaceTagsContainer place={props.placeInfo} handleEditCategory={props.handleEditCategory} />
  icon = props.placeInfo.isNew
    ? {id: 'addTagLight', imageURI: 'addTagLight'}
    : props.placeInfo.primaryIcon
  const placeImage = props.placeInfo.photoURI
    ? <Image style={styles.imageContainer} source={{uri: props.placeInfo.photoURI}} />
    : <Image style={styles.imageContainer} source={{uri: 'noPhoto'}} />
  const containerPadding = props.editNotes ? 50 : 0
  const notes = props.placeInfo.isNew
    ? <View />
    : (
      <Notes
        handleNotesChange={props.handleNotesChange}
        handleSaveNotes={props.handleSaveNotes}
        notes={props.notes} />
    )
  const deletePlace = props.placeInfo.isNew
    ? <View />
    : (
      <TouchableOpacity
        onPress={props.openDeleteModal}>
        <View style={styles.deleteContainer}>
          <Text style={styles.deleteText}>Delete all tags and notes</Text>
        </View>
      </TouchableOpacity>
    )
  return (
    <KeyboardAvoidingView
      style={[styles.container, {paddingBottom: containerPadding}]}
      behavior='position'>
      <ScrollView
        onScroll={(event) => props.handleScroll(event)}
        scrollEventThrottle={50}
        contentContainerStyle={{backgroundColor: 'rgb(240,240,240)'}}>
        {placeImage}
        <PlaceDetails
          placeInfo={props.placeInfo}
          distance={props.distance}
          hours={props.hours}
          open={props.open}
          icon={icon}
          handleAddTag={props.handleAddTag} />
        {tags}
        {map}
        {notes}
        {deletePlace}
      </ScrollView>
      <PlaceInfoNavBar
        handleToMap={props.handleToMap}
        keyboardHeight={props.keyboardHeight}
        icon={icon}
        placeInfo={props.placeInfo}
        navSolid={props.navSolid}
        gradient={props.gradient} />
    </KeyboardAvoidingView>
  )
}

export default PlaceInfo

PlaceInfo.propTypes = {
  placeInfo: React.PropTypes.object.isRequired,
  handleToMap: React.PropTypes.func.isRequired,
  handleAddTag: React.PropTypes.func.isRequired
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'rgb(250,250,250)'
  },
  deleteContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteText: {
    color: 'rgb(177,177,177)',
    fontSize: 10,
    textDecorationLine: 'underline'
  },
  imageContainer: {
    height: 250
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 12,
    marginTop: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(230,230,230)'
  }
})
