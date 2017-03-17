import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPlace, editPlaceCategory } from '../actions'
import { Keyboard } from 'react-native'
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
      notes: props.placeInfo.notes || '',
      keyboardHeight: 0,
      navFillHeight: 26
    }
  }

  componentDidMount () {
    const place = this.props.placeInfo
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
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

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow (e) {
    console.log('Keyboard is showing with height', e.endCoordinates.height)
    this.setState({
      keyboardHeight: e.endCoordinates.height
    })
  }

  keyboardDidHide (e) {
    this.setState({
      keyboardHeight: 0
    })
  }

  handleAddTag () {
    this.props.setSelectedTab('manageTags')
  }

  handleEditCategory (categoryIcon) {
    this.props.editPlaceCategory(categoryIcon)
  }

  handleToMap () {
    if (this.state.editNotes) {
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
    this.props.setSelectedTab('map')
  }

  handleNotesChange (notes) {
    this.setState({
      editNotes: true,
      notes: notes
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

  handleScroll (event) {
    var scrollHeight = event.nativeEvent.contentOffset.y
    console.log('scrollHeight is: ', scrollHeight)
    console.log('navFillHeight is: ', this.state.navFillHeight)
    if (scrollHeight >= 250 && scrollHeight <= 275) {
      var diff = 275 - scrollHeight
      this.setState({
        navFillHeight: diff
      })
    } else if (scrollHeight > 275 && this.state.navFillHeight !== 0) {
      this.setState({
        navFillHeight: 0
      })
    } else if (scrollHeight < 250 && this.state.navFillHeight !== 26) {
      this.setState({
        navFillHeight: 26
      })
    }
  }

  getHours () {
    var d = new Date()
    var today = (d.getDay() - 1) === -1 ? 6 : d.getDay() - 1
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
        handleNotesChange={this.handleNotesChange.bind(this)}
        handleSaveNotes={this.handleSaveNotes.bind(this)}
        notes={this.state.notes}
        keyboardHeight={this.state.keyboardHeight}
        handleScroll={this.handleScroll.bind(this)}
        navFillHeight={this.state.navFillHeight}
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
