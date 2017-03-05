import { combineReducers } from 'redux'
import * as types from './actionTypes'

const shouldShowNames = (region) => {
  if (region.longitudeDelta > 0.010) {
    return false
  } else return true
}

const handleUserLocationUpdate = (state, action) => {
  if (action.regionShouldUpdate) {
    return action.userLocation
  } else {
    return state
  }
}

const getPlaceLocation = (state, action) => {
  return {
    latitude: action.place.latlng.latitude,
    longitude: action.place.latlng.longitude,
    latitudeDelta: state.latitudeDelta,
    longitudeDelta: state.longitudeDelta
  }
}

function region (state = null, action) {
  switch (action.type) {
    case types.SET_REGION: return action.region
    case types.SET_USER_LOCATION: return action.userLocation
    case types.SET_PLACE_INFO: return getPlaceLocation(state, action)
    default: return state
  }
}

function userLocation (state = {}, action) {
  switch (action.type) {
    case types.SET_USER_LOCATION: return action.userLocation
    default: return state
  }
}

function cardId (state = null, action) {
  switch (action.type) {
    //case types.SET_PLACE_INFO: return null
    case types.SET_CARD_ID: return action.id
    case types.END_CARD_SCROLL: return action.id
    case types.LOGOUT: return null
    default: return state
  }
}

function showNames (state = false, action) {
  switch (action.type) {
    case types.SET_REGION: return shouldShowNames(action.region)
    case types.SET_USER_LOCATION: return shouldShowNames(action.userLocation)
    default: return state
  }
}

export default combineReducers({
  region,
  userLocation,
  cardId,
  showNames
})
