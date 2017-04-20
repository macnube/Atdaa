import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPlaceInfo } from '../actions'

import { formatPlaceDetails } from '../../utils/helpers'
import api from '../../utils/api'
import managePlaces from '../../managePlaces'
import map from '../../map'
import PlaceSearch from './PlaceSearch'

class PlaceSearchContainer extends Component {

  constructor (props) {
    super(props)
    var location
    if (props.userLocation.latitude) {
      location = props.userLocation.latitude + ',' + props.userLocation.longitude
    } else {
      location = null
    }
    this.state = {
      location: location,
      loading: false,
      showNearby: true
    }
  }

  componentDidMount () {
    console.log('Mounting placesearch with location', this.state.location)
    var geo = navigator.geolocation
    if (!this.state.location) {
      geo.getCurrentPosition((position) => {
        console.log('user position is', position)
        this.setState({
          location: position.coords.latitude + ',' + position.coords.longitude
        })
      })
    }
  }

  handleSetPlace (data, details) {
    console.log('handleSetPlace from PlaceSearchContainer for:', details.name)
    this.setState({
      loading: true,
      showNearby: false
    })
    if (details) {
      var place = formatPlaceDetails(details, this.props.myPlaces)
      if (place.photos) {
        api.getPlacePhoto(place.photos[0].photo_reference, 180)
        .then((res) => {
          place.photoURI = res.url
          this.props.setPlaceInfo(place)
        })
        .catch((err) => {
          console.log('error with photoURL fetch', err)
          this.props.setPlaceInfo(place)
        })
      } else {
        this.props.setPlaceInfo(place)
      }
    } else {
      console.log('Could not get details for', data)
    }
  }

  handleChangeText (text) {
    console.log('User searching for place: ', text)
    if (text.length > 0) {
      this.setState({
        showNearby: false
      })
    } else {
      this.setState({
        showNearby: true
      })
    }
  }

  render () {
    return (
      <PlaceSearch
        loading={this.state.loading}
        handleSetPlace={this.handleSetPlace.bind(this)}
        handleChangeText={this.handleChangeText.bind(this)}
        showNearby={this.state.showNearby}
        location={this.state.location}
        {...this.props} />

    )
  }
}

const mapStateToProps = (state) => {
  return {
    myPlaces: managePlaces.selectors.getMyPlaces(state),
    userLocation: map.selectors.getUserLocation(state),
    nearbyPlaces: map.selectors.getNearbyPlaces(state)
  }
}

export default connect(mapStateToProps, { setPlaceInfo })(PlaceSearchContainer)
