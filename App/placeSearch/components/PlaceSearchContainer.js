import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPlaceInfo } from '../actions'

import { formatPlaceDetails } from '../../utils/helpers'
import api from '../../utils/api'
import PlaceSearch from './PlaceSearch'
import map from '../../map'

class PlaceSearchContainer extends Component {

  constructor (props) {
    super(props)
    console.log('PlaceSearch with location: ', props.userLocation.latitude + ',' + props.userLocation.longitude)
    console.log('map', map)
    var location
    if (props.userLocation.latitude) {
      location = props.userLocation.latitude + ',' + props.userLocation.longitude
    } else {
      location = null
    }
    this.state = {
      location: location,
      loading: false
    }
  }

  componentDidMount () {
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
    console.log('data from handleSetPlace', data)
    console.log('details from handleSetPlace', details)
    this.setState({
      loading: true
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
      console.log('Data from placeSearchContianer', data)
    }
  }

  render () {
    return (
      <PlaceSearch
        loading={this.state.loading}
        handleSetPlace={this.handleSetPlace.bind(this)}
        location={this.state.location}
        {...this.props} />

    )
  }
}

const mapStateToProps = (state) => {
  return {
    myPlaces: state.myPlaces,
    userLocation: state.map.userLocation
  }
}

export default connect(mapStateToProps, { setPlaceInfo })(PlaceSearchContainer)
