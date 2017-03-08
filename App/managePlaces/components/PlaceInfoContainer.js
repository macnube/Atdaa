import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPlace, editPlaceCategory } from '../actions'

import dashboard from '../../dashboard'
import api from '../../utils/api'
import login from '../../login'
import { getDistanceFromLatLonInKm, placeOpen } from '../../utils/helpers'
import PlaceInfo from './PlaceInfo'

class PlaceInfoContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      distance: 0,
      editNotes: false,
      notes: props.placeInfo.notes || ''
    }
  }

  componentDidMount () {
    const place = this.props.placeInfo
    if (!place.photoURI) {
      console.log('Here')
      if (place.photos) {
        api.getPlacePhoto(place.photos[0].photo_reference, 180)
        .then((res) => {
          const updatedPlace = {...place, photoURI: res.url}
          const currentTime = new Date().getTime() / 1000
          this.props.addPlace(updatedPlace, currentTime)
        })
        .catch((err) => console.log('error with photoURL fetch', err))
      }
    }
    var geo = navigator.geolocation
    geo.getCurrentPosition((position) => {
      console.log('user position is', position)
      this.setState({
        distance: getDistanceFromLatLonInKm(
          position.coords.latitude, position.coords.longitude,
          place.latlng.latitude, place.latlng.longitude)
      })
    })
  }

  handleAddTag () {
    this.props.setSelectedTab('manageTags')
  }

  handleEditCategory (categoryIcon) {
    this.props.editPlaceCategory(categoryIcon)
  }

  handleToMap () {
    this.props.setSelectedTab('map')
  }

  handleNotesChange (notes) {
    this.setState({
      notes: notes
    })
  }

  handleEditNotes () {
    this.setState({
      editNotes: !this.state.editNotes
    })
  }

  handleSaveNotes () {
    this.setState({
      editNotes: false
    })
    const newPlace = {
      ...this.props.placeInfo,
      notes: this.state.notes
    }
    const currentTime = new Date().getTime() / 1000
    api.updateMyPlaces(this.props.userId, this.props.myPlaces, newPlace, currentTime)
    this.props.addPlace(newPlace, currentTime)
  }

  getHours () {
    var d = new Date()
    var today = d.getDay()
    return this.props.placeInfo.open.weekday[today].split('y: ')[1]
  }

  getOpen () {
    return placeOpen(this.props.placeInfo)
  }

  render () {
    console.log('Props from PlaceInfoContainer', this.props)
    return (
      <PlaceInfo
        placeInfo={this.props.placeInfo}
        distance={this.state.distance}
        hours={this.getHours()}
        open={this.getOpen()}
        handleAddTag={this.handleAddTag.bind(this)}
        handleEditCategory={this.handleEditCategory.bind(this)}
        handleToMap={this.handleToMap.bind(this)}
        handleEditNotes={this.handleEditNotes.bind(this)}
        handleNotesChange={this.handleNotesChange.bind(this)}
        handleSaveNotes={this.handleSaveNotes.bind(this)}
        editNotes={this.state.editNotes}
        notes={this.state.notes}
         />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    placeInfo: state.placeInfo,
    userId: login.selectors.getUserId(state.user),
    myPlaces: state.myPlaces
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTab (tab) {
      dispatch(dashboard.actions.setSelectedTab(tab))
    },
    addPlace (place, currentTime) {
      dispatch(addPlace(place, currentTime))
    },
    editPlaceCategory (category) {
      dispatch(editPlaceCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInfoContainer)
