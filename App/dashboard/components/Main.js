import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import iconSearch from '../../iconSearch'
import map from '../../map'
import placeSearch from '../../placeSearch'
import managePlaces from '../../managePlaces'

const { MapContainer } = map
const { IconSearchContainer } = iconSearch
const { PlaceSearchContainer } = placeSearch
const { PlaceInfoContainer, ManageTagsContainer } = managePlaces

const Main = (props) => {
  var component
  console.log('props from Main', props)
  if (props.selectedTab === 'iconSearch') component = <IconSearchContainer />
  else if (props.selectedTab === 'manageTags') component = <ManageTagsContainer />
  else if (props.selectedTab === 'map') component = <MapContainer cardId={props.cardId} searchMarker={props.placeInfo} />
  else if (props.selectedTab === 'placeSearch') component = <PlaceSearchContainer />
  else if (props.selectedTab === 'placeInfo') component = <PlaceInfoContainer />
  return (
    <View style={styles.mainComponent}>
      {component}
    </View>
  )
}

Main.propTypes = {
  placeInfo: React.PropTypes.object,
  selectedTab: React.PropTypes.string.isRequired
}

export default Main

var styles = StyleSheet.create({
  mainComponent: {
    flex: 1
  }
})
