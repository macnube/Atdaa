import React, { Component } from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import MapView from 'react-native-maps'
import POICardsContainer from './POICardsContainer'
import MapMarker from './MapMarker'
import MapStyle from './MapStyle'
import GPSButton from './GPSButton'

class Map extends Component {

  renderPlaces () {
    console.log('Rerendering Map Places')
    return this.props.markerPlaces.ids.map((id, index) => {
      const place = this.props.markerPlaces.placeById[id]
      const selected = place.place_id === this.props.POICardId
      const anchor = this.props.showNames
        ? { x: 0.1, y: 0.6 }
        : { x: 0.5, y: 0.5 }
      return (
        <MapView.Marker
          coordinate={place.latlng}
          anchor={anchor}
          key={id}
          onPress={() => this.props.handleMarkerClick(place)}>
          <MapMarker
            selected={selected}
            place={place}
            showName={this.props.showNames} />
        </MapView.Marker>
      )
    })
  }

  renderSearchMarker () {
    var marker = this.props.searchMarker
    if (marker) {
      return (
        <MapView.Marker
          coordinate={marker.latlng}
          title={marker.name}
          pinColor={'blue'}>
        </MapView.Marker>
      )
    }
  }

  renderPOI () {
    if (this.props.POICardId) {
      return (
        <POICardsContainer
          matchingPlaces={this.props.matchingPlaces}
          visiblePlaces={this.props.visiblePlaces}
          userLocation={this.props.userLocation}
          setCardId={this.props.setCardId}
          cardId={this.props.POICardId}
          moveMapToPlace={this.props.moveMapToPlace} />
      )
    } else return <View />
  }

  renderGPS () {
    if (this.props.showGPS) {
      return (
        <GPSButton
          getLocation={this.props.getLocation}
          layoutInfo={this.props.layoutInfo} />
      )
    } else {
      return <View />
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        {this.renderPOI()}
        <MapView
          ref='map'
          onPress={(event) => this.props.handleMapPress(event)}
          onLayout={() => this.props.setMapReference(this.refs['map'])}
          provider={'google'}
          style={styles.map}
          customMapStyle={MapStyle}
          region={this.props.region}
          onRegionChangeComplete={this.props.handleRegionChange}
          loadingEnabled={true}
          showsUserLocation={true} >
          {this.renderPlaces()}
          {this.renderSearchMarker()}
        </MapView>
        {this.renderGPS()}
      </View>
    )
  }
}

export default Map

var styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 0,
    width: 50,
    height: 20,
    backgroundColor: '#292E37',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    zIndex: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center'
  },
  searchContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: 200,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(41,46,55,.7)',
    borderRadius: 5
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    color: 'white'
  },
  searchButton: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent'
  },
  searchButtonText: {
    color: 'white',
    padding: 10
  },
  callout: {
    width: 140
  },
  calloutText: {
    color: 'white'
  },
  moreInfoButton: {
    backgroundColor: 'transparent'
  },
  moreInfoText: {
    color: 'blue',
    padding: 5
  },
  POIcard: {
    height: 250,
    flexDirection: 'column',
    backgroundColor: '#292E37',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100
  }
})
