import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPlace, editPlaceCategory, deletePlace } from '../actions'
import { Keyboard } from 'react-native'
import dashboard from '../../dashboard'
import api from '../../utils/api'
import login from '../../login'
import placeSearch from '../../placeSearch'
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
      navSolid: false,
      gradient: true
    }
  }

  componentDidMount () {
    console.log('PlaceInfoContainer did mount')
    const place = this.props.placeInfo
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    if (!place.photoURI) {
      console.log('Place did not have photoURI, fetching new one. PlaceInfoContainer')
      if (place.photos) {
        api.getPlacePhoto(place.photos[0].photo_reference, 180)
        .then((res) => {
          console.log('Successfully got new photoURI')
          const updatedPlace = {...place, photoURI: res.url}
          this.props.setPlaceInfo(updatedPlace)
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
    console.log('PlaceInfoContainer did unmount')
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow (e) {
    this.setState({
      keyboardHeight: e.endCoordinates.height
    })
  }

  keyboardDidHide (e) {
    this.setState({
      keyboardHeight: 0
    })
  }

  openDeleteModal () {
    const deleteText = 'Are you sure you want to completely delete this place?'
    this.props.openModal(deleteText, this.handleDeletePlace.bind(this), 'Delete', 'clearModal')
  }

  handleDeletePlace () {
    console.log('handleDeletePlace place from PlaceInfoContainer',
      this.props.placeInfo.name)
    const currentTime = new Date().getTime() / 1000
    api.updateMyPlaces(this.props.userInfo, this.props.myPlaces,
      this.props.placeInfo, currentTime, true)
    this.props.deletePlace(this.props.placeInfo.place_id, currentTime)
    this.props.closeModal()
  }

  handleAddTag () {
    console.log('handleAddTag from PlaceInfoContainer' +
     'moving to ManageTagsContainer for place: ', this.props.placeInfo.name)
    this.props.setSelectedTab('manageTags')
  }

  handleEditCategory (categoryIcon) {
    console.log('handleEditCategory from PlaceInfoContainer for category',
      categoryIcon.id)
    this.props.editPlaceCategory(categoryIcon)
  }

  handleToMap () {
    console.log('handleToMap from PlaceInfoContainer')
    if (this.state.editNotes) {
      console.log('Notes have been edited')
      this.setState({
        editNotes: false
      })
      const newPlace = {
        ...this.props.placeInfo,
        notes: this.state.notes
      }
      const currentTime = new Date().getTime() / 1000
      api.updateMyPlaces(this.props.userInfo, this.props.myPlaces,
        newPlace, currentTime)
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
    console.log('handleSaveNotes, saving general note, from PlaceInfoContainer')
    this.setState({
      editNotes: false
    })
    const newPlace = {
      ...this.props.placeInfo,
      notes: this.state.notes
    }
    const currentTime = new Date().getTime() / 1000
    api.updateMyPlaces(this.props.userInfo, this.props.myPlaces,
      newPlace, currentTime)
    this.props.addPlace(newPlace, currentTime)
  }

  handleScroll (event) {
    var scrollHeight = event.nativeEvent.contentOffset.y
    if (scrollHeight > 160 && scrollHeight < 250) {
      this.setState({
        gradient: false
      })
    } else if (scrollHeight > 270) {
      this.setState({
        navSolid: true
      })
    } else if (scrollHeight < 270 && this.state.navSolid) {
      this.setState({
        navSolid: false
      })
    } else if (scrollHeight < 160 && !this.state.gradient) {
      this.setState({
        gradient: true
      })
    }
  }

  getHours () {
    var d = new Date()
    var today = (d.getDay() - 1) === -1 ? 6 : d.getDay() - 1
    return this.props.placeInfo.open.weekday[today].split('y: ')[1] || 'Unknown'
  }

  getOpen () {
    return placeOpen(this.props.placeInfo)
  }

  render () {
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
        openDeleteModal={this.openDeleteModal.bind(this)}
        notes={this.state.notes}
        keyboardHeight={this.state.keyboardHeight}
        handleScroll={this.handleScroll.bind(this)}
        navSolid={this.state.navSolid}
        gradient={this.state.gradient}
         />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    placeInfo: state.placeInfo,
    userInfo: login.selectors.getUserInfo(state.user),
    myPlaces: state.myPlaces
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTab (tab) {
      dispatch(dashboard.actions.setSelectedTab(tab))
    },
    setPlaceInfo (place) {
      dispatch(placeSearch.actions.setPlaceInfo(place))
    },
    addPlace (place, currentTime) {
      dispatch(addPlace(place, currentTime))
    },
    deletePlace (placeId, currentTime) {
      dispatch(deletePlace(placeId, currentTime))
    },
    editPlaceCategory (category) {
      dispatch(editPlaceCategory(category))
    },
    openModal (text, onYes, yesText, uri) {
      dispatch(dashboard.actions.openModal(text, onYes, yesText, uri))
    },
    closeModal () {
      dispatch(dashboard.actions.closeModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInfoContainer)
