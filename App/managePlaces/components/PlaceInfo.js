import React from 'react'

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'

import PlaceDetails from './placeInfoResources/PlaceDetails'
import PlaceInfoNavBar from './placeInfoResources/PlaceInfoNavBar'
import PlaceTagsContainer from './PlaceTagsContainer'
import Notes from './placeInfoResources/Notes'
import map from '../../map'

const { MapContainer } = map

const PlaceInfo = (props) => {
  console.log('Props in PlaceInfo', props)
  var map, tags, icon
  map = props.placeInfo.isNew
    ? (
      <View style={styles.mapContainer}>
        <MapContainer showGPS={false} searchMarker={props.placeInfo} />
      </View>
      )
    : <View />
  tags = props.placeInfo.isNew
    ? <View />
    : <PlaceTagsContainer place={props.placeInfo} handleEditCategory={props.handleEditCategory}/>
  icon = props.placeInfo.isNew
    ? {id: 'addTagLight', imageURI: 'addTagLight'}
    : props.placeInfo.primaryIcon
  const placeImage = props.placeInfo.photoURI
    ? <Image style={styles.imageContainer} source={{uri: props.placeInfo.photoURI}} />
    : <View style={[styles.imageContainer, {backgroundColor: 'grey'}]} />
  const containerPadding = props.editNotes ? 50 : 20
  return (
    <KeyboardAvoidingView
      style={[styles.container, {paddingBottom: containerPadding}]}
      behavior='position'>
      <PlaceInfoNavBar handleToMap={props.handleToMap} />
      <ScrollView>
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
        <Notes
          handleNotesChange={props.handleNotesChange}
          handleSaveNotes={props.handleSaveNotes}
          notes={props.notes} />
      </ScrollView>
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
  imageContainer: {
    height: 150
  },
  mapContainer: {
    height: 300
  }
})
